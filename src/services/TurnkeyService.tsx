import { DEFAULT_ETHEREUM_ACCOUNTS, Turnkey } from "@turnkey/sdk-server";

class TurnkeyService{
    private static instance: TurnkeyService;
    private turnkey: any;
    public apiClient: any;
    constructor(){
        this.turnkey = new Turnkey({
            apiBaseUrl: "https://api.turnkey.com",
            apiPrivateKey: "345a441b66d410a3e1aa8345ea0fb4394ebf8c29753134edad8b7a4a940940c3",
            apiPublicKey: "027b444ad8fe3a9a9cdf02f4656c1938b613b3c125bb70b565a1cb3ac704f35969",
            defaultOrganizationId: "65d05a99-c8f4-4ab8-8f63-3588121e45a1"
        });
        /*this.turnkey = new Turnkey({
            apiBaseUrl: "https://api.turnkey.com",
            apiPrivateKey: "9d3df90bbce48d0c985aaf84ed6b661733e859bef7b192653849f24760bceb1b",
            apiPublicKey: "03375b3122786f5a9c0a7f062fbd2bd12e2f87462664aae4e188c5861ad0792a52",
            defaultOrganizationId: "324e8c1e-dc1f-4470-88a6-72bf22d8d52c"
        });*/
        this.apiClient = this.turnkey.apiClient();
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
          return organizationData.organizationData.organizationId;
        } catch (error) {
          return "Error getting organization ID: " + error;
        }
      }
    async getUserName(): Promise<string |null>{
        try{
            const organizationData = await this.apiClient.getOrganization();
            return organizationData.organizationData.name
        }catch(error){
            return "Error getting user name: " + error;
        }
    }
    async listSuborgIds(): Promise<Array<string> |[]>{
        const subOrgIds = await this.apiClient.getSubOrgIds()
            return subOrgIds.organizationIds as Array<string>;
    }
    async createSubOrg(subOrgName:string,userName:string,userEmail:string):Promise<string |null>{
        const subOrganizationConfig = {
            subOrganizationName: subOrgName,
            rootUsers: [{
              userName: userName,
              userEmail: userEmail,
              apiKeys: [],
              authenticators: []
            }],
            rootQuorumThreshold: 1,
            wallet: {
              walletName: "myFirstWallet",
              accounts: DEFAULT_ETHEREUM_ACCOUNTS
            }
          };
        const request = await this.apiClient.createSubOrganization(subOrganizationConfig)

        return request.activity.status;
    }
    createSubOrgUser(organizationId:string,userName:string,userEmail:string){
        return "Kayit basarili"
    }
}
export default TurnkeyService;