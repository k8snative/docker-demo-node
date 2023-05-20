import java.text.SimpleDateFormat
import java.util.Date

pipeline {
    agent {
        label 'nodejsfarrukh'
    }

    stages {
        stage('Execute Bash Script') {
            steps {
                script {
                    sh 'git clone git@bitbucket.org:tb-test/customer_frontend_web.git'
                    dir('/root/workspace/customer_frontend_web_dev') {
                        sh 'git checkout dev'
                        sh 'git pull'
                        sh 'npm install --legacy-peer-deps'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Create Zip File') {
            steps {
                script {
                    def buildDirectory = '/root/workspace/customer_frontend_web_dev'  // Replace with the path to your build directory
                    def timestamp = sh (script: 'git --no-pager show -s --format=\'%ae\'',returnStdout: true).trim()
                    def zipFileName = "build_${timestamp}.zip"

                    sh "cd ${buildDirectory} && zip -r ${zipFileName} ."
                }
            }
        }

        stage('Upload to Nexus3') {
            steps {
                script {
                    def nexusUrl = 'http://nexus:8081'  // Replace with your Nexus 3 URL
                    def repository = 'customer_frontend_web_dev'  // Replace with your Nexus repository name
                    def zipFilePath = "/root/workspace/customer_frontend_web_dev/build_${timestamp}.zip"

                    sh "curl -v -u admin:dar3@3rad --upload-file ${zipFilePath} ${nexusUrl}/${repository}/${zipFilePath}"
                }
            }
        }
    }
}
