// pipeline {
//     agent any

     

//     stages {

//         stage('Checkout Code') {
//             steps {
//                     checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Install Playwright Browsers') {
//             steps {
//                 bat 'npx playwright install'
//             }
//         }

//         // stage('Run Playwright Tests- Smoke Test Cases') {
//         //     steps {
//         //         bat 'npx playwright test --grep "@smoke"'
//         //     }
//         // }
//         stage('Run Playwright Tests - Regression Test Cases') {
//             steps {
//                 bat 'npx playwright test --grep "@reg"'
//             }
//         }
//         stage('Generate Report') {
//             steps {
//                 bat 'npx playwright show-report'
//             }
//         }
//     }

//     post {
//         always {
//             archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
//         }

//         success {
//             echo 'Playwright Tests Passed'
//         }

//         failure {
//             echo 'Playwright Tests Failed'
//         }
//     }
// }
pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         script {
        //             def status = bat(script: 'npx playwright test"', returnStatus: true)
        //             if (status != 0) {
        //                 echo "Tests failed, but continuing to generate reports..."
            stage('Run Playwright Tests - Regression Test Cases') {
                steps {
                    bat 'npx playwright test --grep "@reg"'
                }
            }
    }
            
        
    

    post {
        always {
            echo 'Generating HTML reports...'


            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                alwaysLinkToLastBuild: true,
                keepAll: true,
                 alwaysLinkToLastBuild: true,
                allowMissing: true,
                linkRelative: false
            ])

        
        }
    }
}
