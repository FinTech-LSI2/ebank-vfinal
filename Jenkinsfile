pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'sonarqube-server' // Replace with your SonarQube server name in Jenkins
        NEXUS_URL = 'http://<nexus-host>:8081/repository/<repository-name>/'
        NEXUS_CREDENTIALS = 'nexus-credentials-id' // Replace with your Nexus credentials ID in Jenkins
        PROJECT_NAME = 'flask-project'
        VERSION = '1.0.0' // Update this for each release
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                python3 -m venv venv
                . venv/bin/activate
                pip install --upgrade pip
                pip install -r requirements.txt
                '''
            }
        }

        stage('Static Code Analysis with SonarQube') {
            steps {
                script {
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        sh '''
                        . venv/bin/activate
                        sonar-scanner \
                            -Dsonar.projectKey=${PROJECT_NAME} \
                            -Dsonar.sources=. \
                            -Dsonar.python.version=3.8
                        '''
                    }
                }
            }
        }

        stage('Build Artifact') {
            steps {
                sh '''
                . venv/bin/activate
                python setup.py sdist
                '''
            }
        }

        stage('Upload Artifact to Nexus') {
            steps {
                script {
                    def artifact = "dist/${PROJECT_NAME}-${VERSION}.tar.gz"
                    nexusPublisher nexusInstanceId: 'nexus-instance',
                                   nexusRepositoryId: 'repository-name',
                                   packages: [
                                       [$class: 'MavenArtifact',
                                       artifactId: PROJECT_NAME,
                                       version: VERSION,
                                       groupId: 'com.example',
                                       file: artifact]
                                   ]
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 2, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline executed successfully."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
