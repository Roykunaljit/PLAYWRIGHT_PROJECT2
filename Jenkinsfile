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
                    url: 'https://github.com/Roykunaljit/PLAYWRIGHT_PROJECT2.git',
                    branch: 'main'
                )
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
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
    }
    post {
        always {
            script {
                // Archive Playwright HTML Report
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true

                // Publish HTML Report in Jenkins UI (requires HTML Publisher Plugin)
                try {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                } catch (e) {
                    echo "HTML Publisher Plugin not installed or report not found: ${e}"
                }

                // Print instructions
                echo "=== ACCESS YOUR REPORTS ==="
                echo "1. JENKINS UI: Click 'Playwright Test Report' on left sidebar"
                echo "2. DOWNLOAD: Click 'Build Artifacts' to download report ZIP"
                echo "3. LOCAL: Clone repo & run 'npx playwright show-report'"
                echo "4. FILE: Open 'playwright-report/index.html' in browser"

                // Clean workspace (requires Workspace Cleanup Plugin)
                try {
                    cleanWs()
                } catch (e) {
                    echo "Workspace cleanup skipped: ${e}"
                }
            }
        }
    }
} // 👈 Critical: Closes the pipeline block