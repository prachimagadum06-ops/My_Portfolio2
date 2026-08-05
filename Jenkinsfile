pipeline{
    agent any
    stages{
        stage('clone'){
            steps{
                git branch:'main',
                url:"https://github.com/prachimagadum06-ops/My_Portfolio2.git"
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