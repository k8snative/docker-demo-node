pipeline { 
    agent { 
        label 'nodejs1' 
    } 
    
    stages { 
        stage('Execute Bash Script') { 
            steps { 
                script { 
                    if (env.BRANCH_NAME == 'dev') { 
                        dir('/root') { 
                            sh 'git clone git@bitbucket.org:tb-test/customer_frontend_web.git && git checkout dev && git pull && npm install --legacy-peer-deps && npm run build' 
                        } 
                    } else { 
                        echo 'Skipping script execution for branch ${env.BRANCH_NAME}' 
                    } 
                } 
            } 
        } 
    } 
}
