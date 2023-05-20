pipeline { 
    agent { 
        label 'nodejsfarrukh' 
    } 
    
    stages { 
        stage('Execute Bash Script') { 
            steps { 
                sh 'git clone git@bitbucket.org:tb-test/customer_frontend_web.git'
                sh 'git checkout dev'
                script { 
                    if (env.BRANCH_NAME == 'dev') { 
                        dir('/root/customer_frontend_web') { 
                            sh 'git pull' 
                            echo "Hello World"
                        } 
                    } else { 
                        echo 'Skipping script execution for branch ${env.BRANCH_NAME}' 
                    } 
                } 
            } 
        } 
    } 
}
