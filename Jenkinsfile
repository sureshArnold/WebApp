pipeline {
    agent any

    environment{
        
        FRONTEND_IMAGE = "sureshkanuri/frontend"
        BACKEND_IMAGE = "sureshkanuri/backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        SERVER_IP = credentials('WebApp-Server-IP')
        APP_SERVER = "ec2-user@${SERVER_IP}"
        }


    stages{

        stage('checkout'){
            steps{
                git branch: 'main',
                url: 'https://github.com/sureshArnold/WebApp.git'
            }
        }

        stage('Build Frontend Image'){
            steps{
                dir('frontend'){
                    sh '''
                    docker build -t $FRONTEND_IMAGE:$IMAGE_TAG .
                    '''
                }
            }

        }

        stage('Build Backend Image'){
            steps{
                dir('Backend'){
                    sh '''
                    docker build -t $BACKEND_IMAGE:$IMAGE_TAG .
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub'){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId:'Docker-credentials',
                        usernameVariable:'DOCKER_USER',
                        passwordVariable:'DOCKER_PASS'
                    )
                ]){
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    docker push $FRONTEND_IMAGE:$IMAGE_TAG
                    docker push $BACKEND_IMAGE:$IMAGE_TAG

                    docker logout

                    '''
                }
            }
        }

        stage('Deploy to EC2'){
            steps{
               sshagent(credentials:['Jenkins-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $APP_SERVER "
                    docker pull $FRONTEND_IMAGE:$IMAGE_TAG
                    docker pull $BACKEND_IMAGE:$IMAGE_TAG

                    docker stop frontend || true
                    docker rm frontend || true

                    docker stop backend || true
                    docker rm backend || true

                    docker run -p 80:80 -d --name frontend $FRONTEND_IMAGE:$IMAGE_TAG
                    docker run -p 3000:3000 -d --name backend $BACKEND_IMAGE:$IMAGE_TAG
                    "
                    '''
               }
            }
        }
    }

    post{
        success{
            echo 'Deployment Successfull'
        }
        failure{
            echo 'Deployment Failed'
        }
    }


}