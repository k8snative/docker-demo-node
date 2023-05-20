pipeline { 
    agent { 
        label 'nodejsfarrukh' 
    } 
    
    stages { 
        stage('Execute Bash Script') { 
                steps { 
                    script {
                            sh 'git clone git@bitbucket.org:tb-test/customer_frontend_web.git'    
                            dir('/root/customer_frontend_web') {
                                sh 'git checkout dev'
                                sh 'git pull'
                            } 
                        }
                }
        } 
    } 
}
