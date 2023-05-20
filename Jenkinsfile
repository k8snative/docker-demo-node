pipeline { 
    agent { 
        label 'dev' 
    } 
    
    stages { 
        stage('Execute Bash Script') { 
            steps { 
                script { 
                    if (env.BRANCH_NAME == 'dev') { 
                        dir('/var/www/customer_frontend_web_dev') { 
                            sh './deploy' 
                        } 
                    } else { 
                        echo 'Skipping script execution for branch ${env.BRANCH_NAME}' 
                    } 
                } 
            } 
        } 
    } 
}