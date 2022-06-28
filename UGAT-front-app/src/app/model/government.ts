export class Government{
    public submissionDate: Date;    
    public inventoryPeriod: string;
    public cityName: string;
    public population: number;
    public populationYear: number;
    public gDPInUSD: number;
    public landArea: number;
    public inventoryLevel: string;
    public personInCharge: string;
    public contactEmail: string;
    public gHGInventoryVerified: string;
    public verificationYear: number;
    public verificationContact: string;
    
    constructor() {
        this.submissionDate = null;
        this.inventoryPeriod = '';
        this.cityName = '';
        this.population = null;
        this.populationYear = null;
        this.gDPInUSD = null;
        this.landArea = null;
        this.inventoryLevel = '';
        this.personInCharge = '';
        this.personInCharge = '';
        this.contactEmail = '';        
        this.gHGInventoryVerified = '';
        this.verificationYear = null;
        this.verificationContact = '';
      }
}