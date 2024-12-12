let ksbIdIpAdress = "217.30.169.88";
let ksbIdPort = "13080";
let ksbIdInfoBase = "KSB_CRM";
let ksbIdService = "workplace";

let mainIpAdress = "217.30.169.88";
let mainPort = "13080";
let mainInfobase = "InfoBase";
let mainService = "ksbmerp_pos";

const ksbIdUrl = `http://${ksbIdIpAdress}:${ksbIdPort}/${ksbIdInfoBase}/hs/${ksbIdService}`;
const nodeUrl = "http://localhost:8000";
const mainUrl = `http://${mainIpAdress}:${mainPort}/${mainInfobase}/hs/${mainService}`;

export default { ksbIdUrl, nodeUrl, mainService };
