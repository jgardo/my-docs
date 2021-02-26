declare var process: Process;

interface Process {
    env: Env;
}

interface Env {
    BITBUCKET_CLIENT_ID: string;
    FIXED_WORKSPACE_ID: string;
}

interface GlobalEnvironment {
    process: Process;
}
