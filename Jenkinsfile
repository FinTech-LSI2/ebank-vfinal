pipeline {
    agent any

    tools {
        maven "M3"
    }

    environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "390403864598.dkr.ecr.us-east-1.amazonaws.com/finance-service"
        vprofileRegistry = "https://390403864598.dkr.ecr.us-east-1.amazonaws.com"
    }

    stages {
        stage('Build') {
            steps {
                deleteDir()
                git branch: 'finance-service', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/ebank-vfinal.git'
                sh "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Checkstyle') {
            steps {
                sh 'mvn checkstyle:checkstyle'
            }
        }

        stage('Code Analysis with SonarQube') {
            environment {
                scannerHome = tool 'sonar'
            }
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''${scannerHome}/bin/sonar-scanner \
                         -Dsonar.projectKey=ebank \
                         -Dsonar.projectName=vprofile-repo \
                         -Dsonar.projectVersion=1.0 \
                         -Dsonar.sources=src/ \
                         -Dsonar.java.binaries=target/classes \
                         -Dsonar.junit.reportsPath=target/surefire-reports/ \
                         -Dsonar.jacoco.reportsPath=target/jacoco.exec \
                         -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'''
                }
            }
        }

        stage('Upload Artifact') {
            steps {
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: '54.227.60.222:8081/',
                    groupId: 'qa',
                    version: "${env.BUILD_ID}",
                    repository: 'ebank',
                    credentialsId: 'nexus-login',
                    artifacts: [
                        [artifactId: 'finance-service',
                         classifier: '',
                         file: 'target/finance-service-0.0.1-SNAPSHOT.jar',
                         type: 'jar']
                    ]
                )
            }
        }

        stage('Build App Image') {
            steps {
                script {
                    dockerImage = docker.build(appRegistry + ":$BUILD_NUMBER", "client-service/")
                }
            }
        }

        stage('Upload App Image') {
            steps {
                script {
                    docker.withRegistry(vprofileRegistry, registryCredential) {
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                script {
                    deleteDir()
                    git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/ARGOCD_EBANK.git'

                    sh """
                    sed -i 's|image:.*|image: "${appRegistry}:${BUILD_NUMBER}"|' ./finance-deploy.yaml
                    """

                    sh """
                    git config user.name 'AymanGharib'
                    git add finance-deploy.yaml
                    git commit -m "Updated image to ${appRegistry}:${BUILD_NUMBER}"
                    git push https://AymanGharib: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@github.com/FinTech-LSI2/ARGOCD_EBANK.git main
                    """
                }
            }
        }
    }
}
