pipeline{
    agent any 

    stages {

        stage('Install Dependencies') {
        agent {
        docker {
           image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        }
    }
            steps {
                script{

                sh 'npm ci'
                //sh 'npx cucumber-js --format json:allure-results/cucumber-report.json'
                //sh 'npx cucumber-js'
                sh 'npx cucumber-js --format json:allure-results/cucumber-report.json'
                sh 'npx allure generate allure-results -o allure-report'
                sh 'ls -l || echo "Root directory is empty!"'
                sh 'ls -l allure-results || echo "allure-results directory is missing!"'
                stash name: 'allure-results', includes: 'allure-results/*'
            }
            }
        }

    }
    
    post {
        always {
            unstash 'allure-results' //extract results
            script {
                allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
            }
        }
    }
}