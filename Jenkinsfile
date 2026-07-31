pipeline{
    agent any
        stages{
            stage('clone'){
                steps{
                    git branch:'main',
                    url : 'https://github.com/prachimagadum06-ops/My_Portfolio2.git'
                }
            }
            
            
            stage('build'){
                steps{
                    echo 'Portfolio Build Started...'
                }
            }
            
            stage('Deploy'){
                steps{
                    echo 'Portfolio deployed successfully!!'
                }
                
            }
            stage('Build docker image'){
                steps{
                    bat 'docker build -t portfolio:latest.'
                }
                
            }
            stage('List'){
                steps{
                    bat 'docker images'
                }
            }
            
        }
        }