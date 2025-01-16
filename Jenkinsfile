pipeline {
    agent any

    environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "390403864598.dkr.ecr.us-east-1.amazonaws.com/ml-model"
        vprofileRegistry = "https://390403864598.dkr.ecr.us-east-1.amazonaws.com"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'data', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/e-bank.git'
            }
        }
        stage('CODE ANALYSIS with SONARQUBE') {
    environment {
        scannerHome = tool 'sonar'
    }

    steps {
       
            withSonarQubeEnv('sonar-server') {
                sh '''${scannerHome}/bin/sonar-scanner \
                     -Dsonar.projectKey=ebank-python \
                     -Dsonar.projectName=python-microservice \
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
    }

    post {
        always {
            echo "Pipeline completed."
            cleanWs()
        }
    }
}
