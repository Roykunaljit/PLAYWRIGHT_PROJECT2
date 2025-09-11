pipeline {
    agent any
    tools {
        nodejs 'kunal' // 👈 Matches your Jenkins NodeJS tool name
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git(
                    url: 'https://github.com/Roykunaljit/PLAYWRIGHT_PROJECT2.git', // 👈 Removed trailing spaces
                    branch: 'main'
                )
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                // Install Allure Commandline globally to generate report
                sh 'npm install -g allure-commandline --save-dev'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                script {
                    try {
                        sh 'npx playwright test tests/e2e_complete.spec.js'
                    } catch (error) {
                        echo "Tests failed: ${error}"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        stage('Generate Allure Report') {
            steps {
                script {
                    try {
                        // Generate the Allure report from results
                        sh 'allure generate allure-results --clean -o allure-report'
                    } catch (error) {
                        echo "Failed to generate Allure report: ${error}"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                // Publish Playwright HTML Report in Jenkins UI
                try {
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                } catch (e) {
                    echo "Playwright HTML Publisher: ${e}"
                }

                // Publish Allure Report in Jenkins UI
                try {
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report',
                        reportFiles: 'index.html',
                        reportName: 'Allure Test Report'
                    ])
                } catch (e) {
                    echo "Allure HTML Publisher: ${e}"
                }

                // Print instructions
                echo "=== ACCESS YOUR REPORTS ==="
                echo "1. JENKINS UI: Click 'Playwright Test Report' or 'Allure Test Report' on left sidebar"
                echo "2. DOWNLOAD: Click 'Build Artifacts' to download reports ZIP"
                echo "3. LOCAL: Clone repo & run 'npx playwright show-report' for Playwright"
                echo "4. FILE: Open 'playwright-report/index.html' or 'allure-report/index.html' in browser"

                // Archive both Playwright and Allure reports
                archiveArtifacts artifacts: 'playwright-report/**/*, allure-report/**/*', allowEmptyArchive: true

                // Clean workspace (requires Workspace Cleanup Plugin)
                try {
                    cleanWs()
                } catch (e) {
                    echo "Workspace cleanup skipped: ${e}"
                }
            }
        }
    }
}