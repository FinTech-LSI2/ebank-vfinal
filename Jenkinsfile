pipeline {
    agent any

    environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "390403864598.dkr.ecr.us-east-1.amazonaws.com/frontend"
        vprofileRegistry = "https://390403864598.dkr.ecr.us-east-1.amazonaws.com"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'frontend', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/ebank-vfinal.git'
            }
        }
        stage('CODE ANALYSIS with SONARQUBE') {
    environment {
        scannerHome = tool 'sonar'
    }

    steps {
       
            withSonarQubeEnv('sonar-server') {
                sh '''${scannerHome}/bin/sonar-scanner \
                     -Dsonar.projectKey=ebank-front \
                     -Dsonar.projectName=ebank-front \
                     -Dsonar.projectVersion=1.0 \
                     -Dsonar.sources=./ 
                     '''
            }
        
    }
}


        stage('Build App Image') {
            steps {
                script {
                    dockerImage = docker.build(appRegistry + ":$BUILD_NUMBER", "./")
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
                    sed -i 's|image:.*|image: "${appRegistry}:${BUILD_NUMBER}"|' ./frontend-deploy.yaml
                    """

                    sh """
                    git config user.name 'AymanGharib'
                    git add frontend-deploy.yaml
                    git commit -m "Updated image to ${appRegistry}:${BUILD_NUMBER}"
                    git push https://AymanGharib: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@github.com/FinTech-LSI2/ARGOCD_EBANK.git main
                    """
                }
            }
        }


  
  
  
  
  
    }

    post {
        always {
            echo "Pipeline completed."
            cleanWs()
        }
    }
}