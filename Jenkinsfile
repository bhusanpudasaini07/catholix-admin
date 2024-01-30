pipeline {
    agent any
    tools {nodejs "nodejs-16"}
    environment {
        APP_NAME = "orion-frontend"
        DIR_NAME = getDirName(env.BRANCH_NAME)
        SERVER_IP = getServerIp(env.BRANCH_NAME)
        PROCESS_NAME = getProcessName(env.BRANCH_NAME)
        PM2_NAME = getPM2Name(env.BRANCH_NAME)
    }
    stages {
        stage('get_commit_msg') {
            steps {
              script {
                notifyStarted()
                passedBuilds = []
                lastSuccessfulBuild(passedBuilds, currentBuild);
                env.changeLog = getChangeLog(passedBuilds)
                echo "changeLog \n${env.changeLog}"
              }
            }
        }
        stage('Analysis & Deploy') {     
                        steps{
                        script {
                            sshagent(['72c3455a-de8d-4b39-9f02-771ddb2fdf00']) {
                            sh '''
                            ssh -tt -o StrictHostKeyChecking=no root@$SERVER_IP -p 1122 << EOF
                            cd $DIR_NAME; \
                            git stash; \
                            git pull origin $PROCESS_NAME; \
                            nvm use system; \
                            su ekbana -c "
                            pnpm i; \
                            pnpm build; \
                            pm2 restart $PM2_NAME; \
                            "; \
                            exit
                        EOF '''
                        }
                        }
                    }    
                    
  
        
    }
        // stage('EK Build') {
        //     agent any
        //     when {
        //         branch 'dev'
        //     }
        //     steps {
        //         script{
        //                     sshagent(['72c3455a-de8d-4b39-9f02-771ddb2fdf00']) {
        //                     sh '''
        //                     ssh -tt -o StrictHostKeyChecking=no root@110.44.123.47 -p 1122 << EOF
        //                     cd /mnt/disk1/orion/ek/frontend; \
        //                     git pull origin dev; \
        //                     nvm use v18.16.0; \
        //                     su ekbana -c "
        //                     pnpm i; \
        //                     pnpm build; \
        //                     pm2 restart orion_ek_frontend; \
        //                     "; \
        //                     exit
        //                 EOF '''
        //                 }
        //         }
        //     }
        // }
    }

    post{
      success{
        //script {
          //if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'qa' || env.BRANCH_NAME == 'uat' )
            notifySuccessful()
        //}
      }
      failure{
        notifyFailed()
      }
    }
}

def notifyStarted() {
mattermostSend (
  color: "#2A42EE",
  channel: 'orion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/udaih9mwhir1bjsabtt3qjzx4w',
  message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}


def notifySuccessful() {
mattermostSend (
  color: "#00f514",
  channel: 'orion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/udaih9mwhir1bjsabtt3qjzx4w',
  message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>):\n${changeLog}"
  )
}

def notifyFailed() {
mattermostSend (
  color: "#e00707",
  channel: 'orion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/udaih9mwhir1bjsabtt3qjzx4w',
  message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}
def lastSuccessfulBuild(passedBuilds, build) {
  if ((build != null) && (build.result != 'SUCCESS')) {
      passedBuilds.add(build)
      lastSuccessfulBuild(passedBuilds, build.getPreviousBuild())
   }
}

@NonCPS
def getChangeLog(passedBuilds) {
    def log = ""
    for (int x = 0; x < passedBuilds.size(); x++) {
        def currentBuild = passedBuilds[x];
        def changeLogSets = currentBuild.changeSets
        for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j]
                log += "* ${entry.msg} by ${entry.author} \n"
            }
        }
    }
    return log;
  }


//Getting server ip for respective branches
 def getServerIp(branchName) {
    if("main".equals(branchName)) {
        return "110.44.123.47";
    }
    if("dev".equals(branchName)) {
        return "110.44.123.47";
    }
    if("qa".equals(branchName)) {
        return "110.44.123.47";
    }
    if("uat".equals(branchName)) {
        return "110.44.123.47";
    }
    if("dev-ek".equals(branchName)) {
        return "110.44.123.47";
    }
    else {
        return "110.44.123.47";
    }
 }


//Getting branch name for respective branches
def getDirName(branchName) {
    if("dev".equals(branchName)) {
        return "/mnt/disk1/orion/dev/frontend";
    } else if ("qa".equals(branchName)) {
        return "/mnt/disk1/orion/qa/frontend";
    } else if ("uat".equals(branchName)) {
        return "/mnt/disk1/orion/uat/frontend";
    } else if ("dev-ek".equals(branchName)) {
        return "/mnt/disk1/orion/ek/frontend";
    } else {
        return "/mnt/disk1/orion/master/frontend";
    }
}


//Getting branch name for git branch
def getProcessName(branchName) {
    if("dev".equals(branchName)) {
        return "dev";
    } else if ("qa".equals(branchName)) {
        return "not-given";
    } else if ("uat".equals(branchName)) {
        return "not-given";
    } else if ("dev-ek".equals(branchName)) {
        return "dev-ek";
    } else {
        return "not-given";
    }
}


//Getting branch name for PM2 restart
def getPM2Name(branchName) {
    if("dev".equals(branchName)) {
        return "orion_dev_frontend";
    } else if ("dev-ek".equals(branchName)) {
        return "orion_ek_frontend";
    } else if ("qa".equals(branchName)) {
        return "orion_qa_frontend";
    } /*else if ("uat".equals(branchName)) {
        return "orion_uat_frontend";
    } else {
        return "not-given";
    }*/
}
