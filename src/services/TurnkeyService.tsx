import { DEFAULT_ETHEREUM_ACCOUNTS, Turnkey, TurnkeyApiClient } from "@turnkey/sdk-server";
import { Turnkey as TurnkeyBrowser,TurnkeyPasskeyClient } from "@turnkey/sdk-browser";

class TurnkeyService{
    
    private static instance: TurnkeyService;
    private turnkey: Turnkey;
    public apiClient: TurnkeyApiClient;
    private turnkeyBrowser:TurnkeyBrowser;
    public passkeyClient:TurnkeyPasskeyClient;
    constructor(){
        this.turnkey = new Turnkey({
            apiBaseUrl: "https://api.turnkey.com",
            apiPrivateKey: "345a441b66d410a3e1aa8345ea0fb4394ebf8c29753134edad8b7a4a940940c3",
            apiPublicKey: "027b444ad8fe3a9a9cdf02f4656c1938b613b3c125bb70b565a1cb3ac704f35969",
            defaultOrganizationId: "65d05a99-c8f4-4ab8-8f63-3588121e45a1"
        });
        this.turnkeyBrowser = new TurnkeyBrowser({
            apiBaseUrl: "https://api.turnkey.com",
            defaultOrganizationId: "65d05a99-c8f4-4ab8-8f63-3588121e45a1",
            rpId:"localhost"
        });
        this.apiClient = this.turnkey.apiClient();
        this.passkeyClient = this.turnkeyBrowser.passkeyClient();
    }   
    public static getInstance(): TurnkeyService {
        if (!TurnkeyService.instance) {
          TurnkeyService.instance = new TurnkeyService();
        }
        return TurnkeyService.instance;
      }
    async getOrganizationID(): Promise<string | null> {
        try {
          const organizationData = await this.apiClient.getOrganization();
          return organizationData.organizationData.organizationId ? organizationData.organizationData.organizationId : "";
        } catch (error) {
          return "Error getting organization ID: " + error;
        }
      }
    async getUserName(): Promise<string |null>{
        try{
            const organizationData = await this.apiClient.getOrganization();
            return organizationData.organizationData.name ? organizationData.organizationData.name : ""
        }catch(error){
            return "Error getting user name: " + error;
        }
    }
    async listSuborgIds(): Promise<Array<string> |[]>{
        const subOrgIds = await this.apiClient.getSubOrgIds()
            return subOrgIds.organizationIds as Array<string>;
    }
    async createSubOrg(subOrgName:string,userName:string,userEmail:string):Promise<string |null>{
        const credential = await this.passkeyClient.createUserPasskey({
            publicKey: {
                user: {
                  name: "testName",
                  displayName: "TestName"
              }
              }
        })
        const subOrganizationConfig = {
            subOrganizationName: subOrgName,
            rootUsers: [{
              userName: userName,
              userEmail: userEmail,
              apiKeys: [
                {
                    apiKeyName: subOrgName,
                    publicKey: "027b444ad8fe3a9a9cdf02f4656c1938b613b3c125bb70b565a1cb3ac704f35969",
                }
              ],
              authenticators: [
                {
                    authenticatorName: "deneme",
                    challenge: credential.encodedChallenge,
                    attestation: credential.attestation
                  }
              ]
            }],
            rootQuorumThreshold: 1,
            wallet: {
              walletName: "myFirstWallet",
              accounts: DEFAULT_ETHEREUM_ACCOUNTS
            }
          };
        const request = await this.apiClient.createSubOrganization(subOrganizationConfig)
        
        
        console.log(request)
        return request.activity.status;
    }
    async createSubOrgUser(organizationId:string,userName:string,userEmail:string):Promise<string |null>{
        this.turnkeyBrowser = new TurnkeyBrowser({
            apiBaseUrl: "https://api.turnkey.com",
            defaultOrganizationId: organizationId,
            rpId:"localhost"
        });
        this.passkeyClient = this.turnkeyBrowser.passkeyClient();
        
        const credential = await this.passkeyClient.createUserPasskey({
            publicKey: {
                user: {
                  name: userName+"deneme",
                  displayName: "TestName"
              }
              }
        })
        const user = {
            type: "ACTIVITY_TYPE_CREATE_USERS_V2",
            users: [
            {
                userName: userName,
                userEmail: userEmail,
                apiKeys: [
                ],
                authenticators: [
                    {
                        authenticatorName: "deneme",
                        challenge: credential.encodedChallenge,
                        attestation: credential.attestation
                      }
                ],
                userTags: []
            }]}
            
        const request = await this.apiClient.createUsers(user)
        //const currentUser = await this.apiClient.createApiKeys()
        //console.log(currentUser)
        return request.userIds.toString()
    }
}
export default TurnkeyService;