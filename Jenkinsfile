pipeline { 
    agent { 
        label 'nodejsfarrukh' 
    } 
    
    stages { 
        stage('Execute Bash Script') { 
            steps { 
                script { 
                    if (env.BRANCH_NAME == 'dev') { 
                        dir('/root') { 
                            sh 'git clone git@bitbucket.org:tb-test/customer_frontend_web.git' 
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
