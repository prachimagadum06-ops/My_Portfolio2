pipeline{
    agent any
    stages{
        stage('clone'){
            steps{
                git branch:'main',
                url:"https://github.com/laxmipsavadati-code/Portfolio-with-devops"
            }
        }
        stage('build'){
            steps{
                echo 'Portfolio build'
            }
        }
        stage('Deploye'){
            steps{
                echo 'portfolio deployed seccessfully!'
            }
        }
           stage('Build Docker Image') {
            steps {
                bat 'docker build -t portfolio:latest .'
            }
        }

        stage('List Docker Images') {
            steps {
                bat 'docker images'
            }
        }
    }
}