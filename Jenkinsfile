pipeline {
    agent any

     

    stages {

        stage('Checkout Code') {
            steps {
                    checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests- Smoke Test Cases') {
            steps {
                bat 'npx playwright test --grep "@smoke"'
            }
        }
        stage('Run Playwright Tests - Regression Test Cases') {
            steps {
                bat 'npx playwright test --grep "@reg"'
            }
        }
        stage('Generate Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }

        success {
            echo 'Playwright Tests Passed'
        }

        failure {
            echo 'Playwright Tests Failed'
        }
    }
}