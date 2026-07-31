pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/prachimagadum06-ops/My_Portfolio2.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Portfolio Build Started...'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t portfolio:latest .'
            }
        }

        stage('List Images') {
            steps {
                bat 'docker images'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Portfolio deployed successfully!!'
            }
        }
    }
}