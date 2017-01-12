import { component as module_0 } from "./home/home-component.js";
import { component as module_1 } from "./static/faq-component.js";
import { component as module_2 } from "./navigation/navbar-component.js";
import { component as module_3 } from "./console/admin/key-component.js";
import { component as module_4 } from "./camps/groups/groups-component.js";
import { component as module_5 } from "./camps/view/viewCamp-component.js";
import { component as module_6 } from "./console/admin/admin-component.js";
import { component as module_7 } from "./admins/new/adminAdd-component.js";
import { component as module_8 } from "./reservations/new/reg-component.js";
import { component as module_9 } from "./auth/sessions/new/login-component.js";
import { component as module_10 } from "./reservations/forms/forms-component.js";
import { component as module_11 } from "./reservations/view/viewReg-component.js";
import { component as module_12 } from "./console/director/director-component.js";
import { component as module_13 } from "./reservations/tables/tables-component.js";
import { component as module_14 } from "./camps/availability/campAvail-component.js";
import { component as module_15 } from "./reservations/receipt/receipt-component.js";
import { component as module_16 } from "./auth/registrations/new/registration-component.js"; 

// This was written by the componentCompiler task in gulpfile.js
let components = [
	module_0,
	module_1,
	module_2,
	module_3,
	module_4,
	module_5,
	module_6,
	module_7,
	module_8,
	module_9,
	module_10,
	module_11,
	module_12,
	module_13,
	module_14,
	module_15,
	module_16
]
const dependencies = components.map(c => { return `app.components.${c}`})
export {
    dependencies
}

