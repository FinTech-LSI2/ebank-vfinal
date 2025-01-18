pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "M3"
       
    }
environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "390403864598.dkr.ecr.us-east-1.amazonaws.com/client-service"
        vprofileRegistry = "https://390403864598.dkr.ecr.us-east-1.amazonaws.com"
    }




    stages {
        stage('Build') {
            steps {
                    deleteDir()

                // Get some code from a GitHub repository
                git branch: 'client-service', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/ebank-vfinal.git'
                
                // Change to the 'client-service' directory and run Maven
               
                    // Run Maven on a Unix agent
                    sh "mvn -Dmaven.test.failure.ignore=true clean package"
                
            }
        }
 stage('test') {
            steps {
              
            sh 'mvn test'
                }
            

 }

        stage('checkstyle') {
            steps {
            
            sh 'mvn checkstyle:checkstyle'
                
            }



        }

stage('CODE ANALYSIS with SONARQUBE') {
          
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

    
stage('Build App Image') {
       steps {
       
         script {
                dockerImage = docker.build( appRegistry + ":$BUILD_NUMBER", "client-service/")
             }

     }
    
    }


    stage('Upload App Image') {
          steps{
            script {
              docker.withRegistry( vprofileRegistry, registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                dockerImage.push('latest')
              }
            }
          }
     }


stage('Update Kubernetes Manifest') {
    steps {
        script {
            // Clone the manifest repository
            deleteDir()
            git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/FinTech-LSI2/ARGOCD_EBANK.git'

            // Update the manifest file with the new image
            sh """
            sed -i 's|image:.*|image: ${appRegistry}:${BUILD_NUMBER}|' ./client-deploy.yaml
            """

            // Commit and push changes
            sh """
            git config user.name 'AymanGharib'
            git config user.password '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'
           
            git add client-deploy.yaml
            git commit -m "Updated image to ${appRegistry}:${BUILD_NUMBER}"
            git push origin main
            """
        }
    }
}













    }
}
