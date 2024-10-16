export const envs = {
    port: process.env.port ? +process.env.port : 3000,
    isDev: () => process.env.NODE_ENV === 'dev',
    isProd: () => process.env.NODE_ENV === 'prod',
    getNodeEnv: () => process.env.NODE_ENV,
}