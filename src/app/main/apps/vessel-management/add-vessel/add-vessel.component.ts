import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { UserService } from '../../../../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../../../_services';
import * as moment from 'moment';
@Component({
    selector: 'add-vessel',
    templateUrl: './add-vessel.component.html',
    styleUrls: ['./add-vessel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AddVesselComponent implements OnInit, OnDestroy {

    showModalStatus = false;
    showUpdateModalStatus = false;
    addvesselForm: FormGroup;
    loading = false;
        showLoaderImg = false;
        fileRes: any;
    fileResData: any;
    filteredStatusListRes: any;
    filteredStatusData: any;

    filteredCommentData: any;
    filteredCommentListRes: any;

    filteredStateData: any;
    filteredStateListRes: any;

    filteredBuilderData: any;
    filteredFlagData: any;

    filteredFlagListRes: any;
    filteredBuilderListRes: any;

    filteredAuxEngineData: any;
    filteredAuxEngineListRes: any;

    filteredAuxEngineTypeData: any;
    filteredAuxEngineTypeListRes: any;

    filteredNationalData: any;
    filteredNationalListRes: any;

    // filteredVesselListRes: any;
    // filteredVesselData: any;
    filteredVesselListRes: any;
    filteredVesselData: any;

    filteredPortData: any;
    filteredPortListRes: any;

    companyListData: any;
    companyListRes: any;

    ifoListData: any;
    ifoListListRes: any;

    filteredActivityData: any;
    filteredActivityListRes: any;

    name: string;
    statusListRes: any;
    stateListRes: any;
    createVesselRes: any;
    imo: Number;
    vessel_name: string;
    id_operator: number;
    id_builder: number;
    id_comment: number;
    yard_number: string;
    hull: string;
    built_month: number;
    built_year: number;
    dwt_tropical: number;
    dwt_tropical_freshwater: number;
    dwt_freshwater: number;
    dwt_summer: number;
    grt: number;
    nrt: number;
    vessel_type: number;
    bale_meter_capacity: number;
    grain_meter_capacity: number;
    bale_feet_capacity: number;
    grain_feet_capacity: number;
    length_hold: string;
    height_hold: string;
    length_hatch: string;
    height_hatch: string;
    width_hold_before: string;
    width_hold_after: string;
    width_hatch_before: string;
    width_hatch_after: string;
    gear: string;
    swl: number;
    loa: number;
    lbp: number;
    beam: number;
    depth: number;
    draft_tropical: string;
    draft_tropical_freshwater: string;
    draft_freshwater: string;
    draft_summer: string;
    tpc: Number;
    breadth_moulded: Number;
    displacement: string;
    country_of_build: string;
    survey_month: Number;
    survey_year: Number;
    main_engine_design: number;
    main_engine_type: number;
    aux_engine_design: number;
    aux_engine_type: number;
    power: number;
    speed_laden_1: number;
    laden_fuel_1: number;
    id_fuel_type_laden_1: string;
    speed_ballast_1: number;
    ballast_fuel_1: number;
    id_fuel_type_ballast_1: number;
    speed_laden_2: number;
    laden_fuel_2: number;
    id_fuel_type_laden_2: string;
    speed_ballast_2: number;
    ballast_fuel_2: number;
    id_fuel_type_ballast_2: number;
    speed_laden_3: number;
    laden_fuel_3: number;
    id_fuel_type_laden_3: string;
    speed_ballast_3: number;
    ballast_fuel_3: number;
    id_fuel_type_ballast_3: number;
    engine_hours: number;
    fuel_aux_1: number;
    id_fuel_type_aux_1: number;
    fuel_aux_2: number;
    id_fuel_type_aux_2: number;
    fuel_aux_3: number;
    id_fuel_type_aux_3: number;
    flag: number;
    base: number;
    status: number;
    cost: number;
    scrap_value: number;
    amorization_period: number;
    cost_of_capital: number;
    annual_operating_cost: number;
    breakeven_daily_cost: number;
    daily_operating_cost: number;
    port_of_registry: number;
    owner: number;
    ship_manager: number;
    call_sign: string;
    age_of_ship: number;
    ice_class: string;
    inmarsat_fax: string;
    inmarsat_telex: string;
    smc_company: string;
    smc_issued: string;
    smc_issued_date: string;
    smc_expiry_date: string;
    crew: number;
    crew_nationality: number;
    officiers_nationality: number;
    hull_material: string;
    decks_number: string;
    dbl_bottom: string;
    bollard_pull: string;
    bulbows_bow: string;
    dbl_deck: string;
    winches: number;
    activity: number;
    main_engine_rpm: string;
    grabs: number;
    grabs_number: number;
    grabs_capacity: number;
    contract_date: string;
    cancel_date: string;
    main_engine_builder: number;
    pandl_club: string;
    fuel_type_1: string;
    fuel_type_2: string;
    class_narrative: string;
    group_beneficial_owner: string;
    new_construction_entry_date: string;
    number_of_holds: string;
    number_of_hatches: string;
    delivery_month: string;
    delivery_year: string;
    light_weight_tons: string;
    block_coeficient: string;
    hull_type: string;
    main_engine_model: string;
    main_engine_stroke_type: string;
    consumption_speed: number;
    fuel_consumption_main_engine_only: string;
    cargo_capacities_narrative: string;
    constants: string;
    dbl_side_skins: string;
    company_background_sheet: any;
    vessal_history_sheet: any;
    operating_record_sheet: any;
    submitted = false;
    createUserRes: any;
    userRoleId: any;
    returnUrl: string;
    roleAccessListData: any;

    // Private

    editshowModalStatus = false;
    secondModalStatus = false;
    private _unsubscribeAll: Subject<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private _userService: UserService,
        private _fuseSidebarService: FuseSidebarService,
        private http: HttpClient,
        private alertService: AlertService,
        
    ) {
        this._unsubscribeAll = new Subject();
        this.filteredStateData = [];
        this.filteredBuilderData = [];
        this.showLoaderImg = false;

        let userToken = localStorage.getItem('userToken')
        if(userToken==undefined){
            this.router.navigate(['/']);
        }
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */



    ngOnInit(): void {
        this.stateList();
        this.statusList();
        this.builderList();
        this.flagList();
        this.commentList();
        this.auxengineList();
        this.auxenginetypeList();
        this.nationalList();
        this.vesselList();
        this.portList();
        this.companyshipList();
        this.operatorList();
        this.fuelList();
        this.activityList();
        
        // this.companyData = JSON.parse(localStorage.getItem('companyData'));
        this.addvesselForm = this._formBuilder.group({
            imo: ['', Validators.required],
            vessel_name: ['', Validators.required],
            id_operator: ['', Validators.required],
            id_builder: ['', Validators.required],
            id_comment: ['', Validators.required],
            yard_number: ['', Validators.required],
            pandl_club: ['', Validators.required],
            fuel_type_1: ['', Validators.required],
            fuel_type_2: ['', Validators.required],
            class_narrative: ['', Validators.required],
            group_beneficial_owner: ['', Validators.required],
            new_construction_entry_date: ['', Validators.required],
            contract_date: ['', Validators.required],
            cancel_date: ['', Validators.required],
            country_of_build: ['', Validators.required],
            number_of_holds: ['', Validators.required],
            number_of_hatches: ['', Validators.required],
            length_hold: ['', Validators.required],
            height_hold: ['', Validators.required],
            length_hatch: ['', Validators.required],
            height_hatch: ['', Validators.required],
            width_hold_before: ['', Validators.required],
            width_hold_after: ['', Validators.required],
            width_hatch_before: ['', Validators.required],
            width_hatch_after: ['', Validators.required],
            fuel_consumption_main_engine_only: ['', Validators.required],
            hull_type: ['', Validators.required],
            main_engine_builder: ['', Validators.required],
            main_engine_model: ['', Validators.required],
            status: ['', Validators.required],
            cost: ['', Validators.required],
            scrap_value: ['', Validators.required],
            amorization_period: ['', Validators.required],
            cost_of_capital: ['', Validators.required],
            annual_operating_cost: ['', Validators.required],
            breakeven_daily_cost: ['', Validators.required],
            daily_operating_cost: ['', Validators.required],
            port_of_registry: ['', Validators.required],
            owner: ['', Validators.required],
            ship_manager: ['', Validators.required],
            call_sign: ['', Validators.required],
            built_month: ['', Validators.required],
            built_year: ['', Validators.required],
            age_of_ship: ['', Validators.required],
            ice_class: ['', Validators.required],
            inmarsat_fax: ['', Validators.required],
            inmarsat_telex: ['', Validators.required],
            smc_company: ['', Validators.required],
            smc_issued: ['', Validators.required],
            smc_issued_date: ['', Validators.required],
            main_engine_rpm: ['', Validators.required],
            main_engine_stroke_type: ['', Validators.required],
            consumption_speed: ['', Validators.required],
            cargo_capacities_narrative: ['', Validators.required],
            grabs: ['', Validators.required],
            grabs_number: ['', Validators.required],
            grabs_capacity: ['', Validators.required],
            hull: ['', Validators.required],
            delivery_month: ['', Validators.required],
            delivery_year: ['', Validators.required],
            dwt_tropical: ['', Validators.required],
            dwt_tropical_freshwater: ['', Validators.required],
            dwt_freshwater: ['', Validators.required],
            dwt_summer: ['', Validators.required],
            draft_tropical: ['', Validators.required],
            draft_tropical_freshwater: ['', Validators.required],
            draft_freshwater: ['', Validators.required],
            draft_summer: ['', Validators.required],
            grt: ['', Validators.required],
            nrt: ['', Validators.required],
            vessel_type: ['', Validators.required],
            bale_meter_capacity: ['', Validators.required],
            grain_meter_capacity: ['', Validators.required],
            bale_feet_capacity: ['', Validators.required],
            grain_feet_capacity: ['', Validators.required],
            gear: ['', Validators.required],
            swl: ['', Validators.required],
            loa: ['', Validators.required],
            lbp: ['', Validators.required],
            beam: ['', Validators.required],
            depth: ['', Validators.required],
            tpc: ['', Validators.required],
            breadth_moulded: ['', Validators.required],
            displacement: ['', Validators.required],
            light_weight_tons: ['', Validators.required],
            block_coeficient: ['', Validators.required],
            main_engine_design: ['', Validators.required],
            main_engine_type: ['', Validators.required],
            aux_engine_design: ['', Validators.required],
            aux_engine_type: ['', Validators.required],
            power: ['', Validators.required],
            constants: ['', Validators.required],
            flag: ['', Validators.required],
            base: ['', Validators.required],
            smc_expiry_date: ['', Validators.required],
            crew: ['', Validators.required],
            crew_nationality: ['', Validators.required],
            hull_material: ['', Validators.required],
            decks_number: ['', Validators.required],
            bulbows_bow: ['', Validators.required],
            dbl_bottom: ['', Validators.required],
            bollard_pull: ['', Validators.required],
            dbl_deck: ['', Validators.required],
            winches: ['', Validators.required],
            dbl_side_skins: ['', Validators.required],
            survey_month: ['', Validators.required],
            survey_year: ['', Validators.required],
            activity: ['', Validators.required],
            officiers_nationality: ['', Validators.required],
            speed_laden_1: ['', Validators.required],
            laden_fuel_1: ['', Validators.required],
            id_fuel_type_laden_1: ['', Validators.required],
            speed_ballast_1: ['', Validators.required],
            ballast_fuel_1: ['', Validators.required],
            id_fuel_type_ballast_1: ['', Validators.required],
            speed_laden_2: ['', Validators.required],
            laden_fuel_2: ['', Validators.required],
            id_fuel_type_laden_2: ['', Validators.required],
            speed_ballast_2: ['', Validators.required],
            ballast_fuel_2: ['', Validators.required],
            id_fuel_type_ballast_2: ['', Validators.required],
            speed_laden_3: ['', Validators.required],
            laden_fuel_3: ['', Validators.required],
            id_fuel_type_laden_3: ['', Validators.required],
            speed_ballast_3: ['', Validators.required],
            ballast_fuel_3: ['', Validators.required],
            id_fuel_type_ballast_3: ['', Validators.required],
            engine_hours: ['', Validators.required],
            fuel_aux_1: ['', Validators.required],
            id_fuel_type_aux_1: ['', Validators.required],
            fuel_aux_2: ['', Validators.required],
            id_fuel_type_aux_2: ['', Validators.required],
            fuel_aux_3: ['', Validators.required],
            id_fuel_type_aux_3: ['', Validators.required],
            company_background_sheet:  [''],
            vessal_history_sheet: [''],
            operating_record_sheet: [''],
        });
        console.log(this.addvesselForm);


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/vessel-management';
    }

    //   /**
    //    * @title Simple autocomplete
    //    */

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }
    get f() { return this.addvesselForm.controls; }

    onFileSelect(value) {
        if (value.target.files.length > 0) {
            const file = value.target.files[0];
            // this.company_background_sheet = file;
            this.fileUpload(file, 'first')
        }

    }
    onFileSelect2(value) {
        if (value.target.files.length > 0) {
            const file = value.target.files[0];
            // this.vessal_history_sheet = file;
            this.fileUpload(file, 'second')
        }
    }
    onFileSelect3(value) {
        if (value.target.files.length > 0) {
            const file = value.target.files[0];
            // this.operating_record_sheet = file;
            this.fileUpload(file, 'third')
        }
    }
    fileUpload(file, num) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            this._userService.addFile(formData)
                .pipe(first())
                .subscribe((res) => {
                    this.fileRes = res;
                    if (this.fileRes.success === true) {
                        if (num === 'first') {
                            this.company_background_sheet = this.fileRes.fileurl;
                            console.log('first', this.company_background_sheet);
                        } else if (num === 'second') {
                            this.vessal_history_sheet = this.fileRes.fileurl;
                            console.log('second', this.vessal_history_sheet);
                        } else if (num === 'third') {
                            this.operating_record_sheet = this.fileRes.fileurl;
                            console.log('third', this.operating_record_sheet);
                        }
                    }
                },
                    err => {
                        this.alertService.error(err, 'Error');
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }

    }
    onchaa() {
        
    }

   
    onSubmit(): void {
        // console.log('add user');
        this.submitted = true;
        this.showLoaderImg = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        // if (this.addvesselForm.invalid) {
        //     return;
        // } else {
            let requestdata = {
                "imo" : this.f.confirmimo.value,
                "vessel_name" : this.f.vessel_name.value,
                "Exvessel_name":this.f.Exvessel_name.value,
                "id_operator" : this.f.operator.value,
                "id_builder" : this.f.builder.value,
                "id_comment" : this.f.comment.value,
                "yard_number" : this.f.yardno.value,
                "pandl_club" : this.f.pandl_club.value,
                "consumption_total":this.f.consumption_total.value,
                "fuel_type_1" : this.f.fuel_type1.value,
                "fuel_type_2" : this.f.fuel_type2.value,
                "class_narrative" : this.f.class_narrative.value,
                "group_beneficial_owner" : this.f.group_beneficial_owner.value,
                "new_construction_entry_date" : this.f.new_construction_entry.value,
                "contract_date" : this.f.construction_date.value,
                "cancel_date" : this.f.cancel_date.value,
                "country_of_build" : this.f.country_of_build.value,
                "number_of_holds" : this.f.number_of_holds.value,
                "length_hold" : this.f.length_hold.value,
                "height_hold" : this.f.height_hold.value,
                "length_hatch" : this.f.length_hatch.value,
                "height_hatch" : this.f.height_hatch.value,
                "width_hold_before" : this.f.width_hold_before.value,
                "width_hold_after" : this.f.width_hold_after.value,
                "width_hatch_before" : this.f.width_hatch_before.value,
                "width_hatch_after" : this.f.width_hatch_after.value,
                "number_of_hatches" : this.f.number_of_hatches.value,
                "fuel_consumption_main_engine_only" : this.f.fuel_consumption_main_engine_only.value,
                "hull_type" : this.f.hull_type.value,
                "main_engine_builder" : this.f.main_engine_builder.value,
                "main_engine_model" : this.f.main_engine_model.value,
                "main_engine_model_rpm" : this.f.main_engine_rpm.value,
                "main_engine_stroke_type" : this.f.main_engine_stroke_type.value,
                "status" : this.f.status.value,
                "cost" : this.f.cost.value,
                "scrap_value" : this.f.scrap_value.value,
                "amorization_period" : this.f.Amorization.value,
                "cost_of_capital" : this.f.cost_of_capital.value,
                "annual_operating_cost" : this.f.annual_operating_cost.value,
                "breakeven_daily_cost" : this.f.breakeven_daily_cost.value,
                "daily_operating_cost" : this.f.daily_operating_cost.value,
                "port_of_registry" : this.f.registry.value,
                "owner" : this.f.owner.value,
                "ship_manager" : this.f.ship_manager.value,
                "call_sign" : this.f.call_sign.value,
                "built_month" : this.f.built_month.value,
                "built_year" : this.f.delivery_year.value,
                "age_of_ship" : this.f.age_of_ship.value,
                "ice_class" : this.f.ice_class.value,
                "inmarsat_fax" : this.f.inmarsat_fax.value,
                "inmarsat_telex" : this.f.inmarsat_telex.value,
                "smc_company" : this.f.smc_company.value,
                "smc_issued" : this.f.smc_issued.value,
                "mobileno" : this.f.mobile_number.value,
                "email" : this.f.email.value,
                "smc_issued_date" : moment(this.f.smc_issued_date.value).format('DD-MM-YYYY'),
                // "smc_issued_date" : this.f.smc_issued_date.value,
                "consumption_speed" : this.f.consumption_speed.value,
                "cargo_capacities_narrative" : this.f.cargo_capacities_narrative.value,
                "grabs" : this.f.grabs.value,
                "grabs_number" : this.f.grabs_number.value,
                "grabs_capacity" : this.f.grabs_capacity.value,
                "hull" : this.f.hull.value,
                "delivery_month" : this.f.delivery_month.value,
                "delivery_year" : this.f.delivery_year.value,
                "dwt_tropical" : this.f.dwt_tropical.value,
                "death_month":this.f.death_month.value,
                "death_year":this.f.death_year.value,
                "dwt_tropical_freshwater" : this.f.dwt_tropical_freshwater.value,
                "dwt_freshwater" : this.f.dwt_freshwater.value,
                "draft_tropical" : this.f.draft_tropical.value,
                "dwt_summer" : this.f.dwt_summer.value,
                "draft_tropical_freshwater" : this.f.draft_tropical_freshwater.value,
                "draft_freshwater" : this.f.draft_freshwater.value,
                "draft_summer" : this.f.draft_summer.value,
                "grt" : this.f.grt.value,
                "nrt" : this.f.nrt.value,
                "vessel_type" : this.f.vessel_type.value,
                "bale_meter_capacity" : this.f.bale_meter_capacity.value,
                "grain_meter_capacity" : this.f.grain_meter_capacity.value,
                "bale_feet_capacity" : this.f.bale_feet_capacity.value,
                "grain_feet_capacity" : this.f.grain_feet_capacity.value,
                "gear" : this.f.gear.value,
                "swl" : this.f.swl.value,
                "loa" : this.f.loa.value,
                "lbp" : this.f.lbp.value,
                "beam" : this.f.beam.value,
                "depth" : this.f.depth.value,
                "tpc" : this.f.tpc.value,
                "breadth_moulded" : this.f.breadth_moulded.value,
                "displacement" : this.f.displacement.value,
                "light_weight_tons" : this.f.light_weight_tons.value,
                "block_coeficient" : this.f.block_coeficient.value,
                "main_engine_design" : this.f.main_engine_design.value,
                "main_engine_type" : this.f.main_engine_type.value,
                "aux_engine_design" : this.f.aux_engine_design.value,
                "aux_engine_type" : this.f.aux_engine_type.value,
                "class_society":this.f.class_society.value,
                "power" : this.f.power.value,
                "constants" : this.f.constants.value,
                "flag" : this.f.flag.value,
                "base" : this.f.base.value,
                "smc_expiry_date" : moment(this.f.smc_expiry_date.value).format('DD-MM-YYYY'),
                // "smc_expiry_date" : this.f.smc_expiry_date.value,
                "crew" : this.f.crew.value,
                "crew_nationality" : this.f.crew_nationality.value,
                "hull_material" : this.f.hull_material.value,
                "decks_number" : this.f.decks_number.value,
                // "bulbows_bow" : this.f.bulbows_bow.value,
                // "dbl_bottom" : this.f.dbl_bottom.value,
                "bollard_pull" : this.f.bollard_pull.value,
                // "dbl_deck" : this.f.dbl_deck.value,
                "winches" : this.f.winches.value,
                "dbl_side_skins" : this.f.dbl_side_skins.value,
                "survey_month" : this.f.survey_month.value,
                "survey_year" : this.f.survey_year.value,
                "activity" : this.f.activity.value,
                "officiers_nationality" : this.f.officiers_nationality.value,
                // "speed_laden_1" : this.f.speed_laden_1.value,
                // "laden_fuel_1" : this.f.laden_fuel_1.value,
                // "id_fuel_type_laden_1": this.f.id_fuel_type_laden_1.value,
                // "speed_ballast_1" : this.f.speed_ballast_1.value,
                // "ballast_fuel_1" : this.f.ballast_fuel_1.value,
                // "id_fuel_type_ballast_1" : this.f.id_fuel_type_ballast_1.value,
                // "speed_laden_2" : this.f.speed_laden_2.value,
                // "laden_fuel_2" : this.f.laden_fuel_2.value,
                // "id_fuel_type_laden_2" : this.f.id_fuel_type_laden_2.value,
                // "speed_ballast_2": this.f.speed_ballast_2.value,
                // "ballast_fuel_2": this.f.ballast_fuel_2.value,
                // "id_fuel_type_ballast_2" : this.f.id_fuel_type_ballast_2.value,
                // "speed_laden_3" : this.f.speed_laden_3.value,
                // "laden_fuel_3" : this.f.laden_fuel_3.value,
                // "id_fuel_type_laden_3" : this.f.id_fuel_type_laden_3.value,
                // "speed_ballast_3" : this.f.speed_ballast_3.value,
                // "ballast_fuel_3" : this.f.ballast_fuel_3.value,
                // "id_fuel_type_ballast_3" : this.f.id_fuel_type_ballast_3.value,
                // "engine_hours" : this.f.engine_hours.value,
                // "fuel_aux_1" : this.f.fuel_aux_1.value,
                // "id_fuel_type_aux_1" : this.f.id_fuel_type_aux_1.value,
                // "fuel_aux_2" : this.f.fuel_aux_2.value,
                // "id_fuel_type_aux_2" : this.f.id_fuel_type_aux_2.value,
                // "fuel_aux_3" : this.f.fuel_aux_3.value,
                // "id_fuel_type_aux_3" : this.f.id_fuel_type_aux_3.value,
                "company_background_sheet" : this.company_background_sheet,
                "vessal_history_sheet" : this.vessal_history_sheet,
                "operating_record_sheet" : this.operating_record_sheet,
            
            }
            try {
                this._userService.AddVessel(requestdata)
                    .pipe(first())
                    .subscribe((res) => {
                        this.showLoaderImg = false;
                        this.createVesselRes = res;
                        if (this.createVesselRes.success === true) {
                            this.alertService.success(this.createVesselRes.message, 'Success');
                            this.addvesselForm.reset();
                            this.company_background_sheet = null;
                            this.vessal_history_sheet = null;
                            this.operating_record_sheet = null;
                            this.router.navigate([this.returnUrl]);
                            this.editshowModal();
                        } else {
                            this.alertService.error(this.createVesselRes.message, 'Error');
                        }
                    },
                        err => {
                            this.alertService.error(err, 'Error');
                            console.log(err);
                        });

            } catch (err) {
                console.log(err);
            }
        // }

    }

    //second form
        addform(): void {
            this.editshowModal();
        }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    addvessel(): void {
        this.secondModal();
    }
  
    secondModal(): void {
        this.secondModalStatus = !this.secondModalStatus;
        // secondModalStatus = false;
    }
    hidesecondModal(): void {
        this.secondModalStatus = !this.secondModalStatus;
        // secondModalStatus = false;
    }

    editshowModal(): void {
        this.editshowModalStatus = !this.editshowModalStatus;       
    }

    // Builder List
    builderList(): void {
        try {
            this._userService.getbuilderList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredBuilderListRes = res;
                    if (this.filteredBuilderListRes.success === true) {
                        this.filteredBuilderData = this.filteredBuilderListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Flag List
    flagList(): void {
        try {
            this._userService.getflagList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredFlagListRes = res;
                    if (this.filteredFlagListRes.success === true) {
                        this.filteredFlagData = this.filteredFlagListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // State List
    stateList(): void {
        try {
            this._userService.getstateList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredStateListRes = res;
                    if (this.filteredStateListRes.success === true) {
                        this.filteredStateData = this.filteredStateListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Status List
    statusList(): void {
        try {
            this._userService.getstatusList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredStatusListRes = res;
                    if (this.filteredStatusListRes.success === true) {
                        this.filteredStatusData = this.filteredStatusListRes.data;
                        console.log(this.filteredStatusData);
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Comment List
    commentList(): void {
        try {
            this._userService.getcommmentList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredCommentListRes = res;
                    if (this.filteredCommentListRes.success === true) {
                        this.filteredCommentData = this.filteredCommentListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Engine Design List
    auxengineList(): void {
        try {
            this._userService.getenginedesignList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredAuxEngineListRes = res;
                    if (this.filteredAuxEngineListRes.success === true) {
                        this.filteredAuxEngineData = this.filteredAuxEngineListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Engine Design List
    auxenginetypeList(): void {
        try {
            this._userService.getenginetypeList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredAuxEngineTypeListRes = res;
                    if (this.filteredAuxEngineTypeListRes.success === true) {
                        this.filteredAuxEngineTypeData = this.filteredAuxEngineTypeListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Nationality List
     nationalList(): void {
        try {
            this._userService.getnationalityList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredNationalListRes = res;
                    if (this.filteredNationalListRes.success === true) {
                        this.filteredNationalData = this.filteredNationalListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

     // Vessel List
     vesselList(): void {
        try {
            this._userService.getvesseltypeeList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredVesselListRes = res;
                    if (this.filteredVesselListRes.success === true) {
                        this.filteredVesselData = this.filteredVesselListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Port Of Registry List
    portList(): void {
        try {
            this._userService.getregistryList()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredPortListRes = res;
                    if (this.filteredPortListRes.success === true) {
                        this.filteredPortData = this.filteredPortListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

     // Company List
     companyshipList(): void {
        try {
            this._userService.getcompanyList()
                .pipe(first())
                .subscribe((res) => {
                    this.companyListRes = res;
                    if (this.companyListRes.success === true) {
                        this.companyListData = this.companyListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

    // Operator List
    operatorList(): void {
        try {
            this._userService.getcompanyList()
                .pipe(first())
                .subscribe((res) => {
                    this.companyListRes = res;
                    if (this.companyListRes.success === true) {
                        this.companyListData = this.companyListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    } 
   

    // Fuel List
    fuelList(): void {
        try {
            this._userService.getfueltypeList()
                .pipe(first())
                .subscribe((res) => {
                    this.ifoListListRes = res;
                    this.secondModalStatus = false;
                    if (this.ifoListListRes.success === true) {
                        this.ifoListData = this.ifoListListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }

     // Fuel List
     activityList(): void {
        try {
            this._userService.getactivitylist()
                .pipe(first())
                .subscribe((res) => {
                    this.filteredActivityListRes = res;
                    if (this.filteredActivityListRes.success === true) {
                        this.filteredActivityData = this.filteredActivityListRes.data;
                    }
                },
                    err => {
                        console.log(err);
                    });

        } catch (err) {
            console.log(err);
        }
    }
  
    

    changestats(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            status: event
         });
        // console.log(this.f.status.value);
    }

    changebuilder(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_builder: event
         });
        // console.log(this.f.id_builder.value);
    }

    changecomment(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_comment: event
         });
        // console.log(this.f.id_comment.value);
    }

    changeport(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            port_of_registry: event
         });
        // console.log(this.f.port_of_registry.value);
    }

    changeship(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            ship_manager: event
         });
        // console.log(this.f.ship_manager.value);
    }

    changecountry(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            crew_nationality: event
         });
        // console.log(this.f.crew_nationality.value);
    }

    changeofficer(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            officiers_nationality: event
         });
        // console.log(this.f.officiers_nationality.value);
    }

    changeactivity(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            activity: event
         });
        // console.log(this.f.activity.value);
    }

    changevessel(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            vessel_type: event
         });
        // console.log(this.f.vessel_type.value);
    }

    changeauxengine(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            aux_engine_design: event
         });
        // console.log(this.f.aux_engine_design.value);
    }

    changeauxenginetype(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            aux_engine_type: event
         });
        // console.log(this.f.aux_engine_type.value);
    }

    changebase(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            base: event
         });
        // console.log(this.f.base.value);
    }

    changefuelladen(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_laden_1: event
         });
        // console.log(this.f.id_fuel_type_laden_1.value);
    }

    changefuelballast(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_ballast_1: event
         });
        // console.log(this.f.id_fuel_type_ballast_1.value);
    }

    changefueltypeladen(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_laden_2: event
         });
        // console.log(this.f.id_fuel_type_laden_2.value);
    }

    changefueltypeballast(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_ballast_2: event
         });
        // console.log(this.f.id_fuel_type_ballast_2.value);
    }

    changefueltypeladenth(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_laden_3: event
         });
        // console.log(this.f.id_fuel_type_laden_3.value);
    }

    changefueltypeballastth(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_ballast_3: event
         });
        // console.log(this.f.id_fuel_type_ballast_3.value);
    }

    changefueltypeaux(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_aux_1: event
         });
        // console.log(this.f.id_fuel_type_aux_1.value);
    }

    changefueltypeauxtwo(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_aux_2: event
         });
        // console.log(this.f.id_fuel_type_aux_1.value);
    }

    changefueltypeauxthree(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            id_fuel_type_aux_3: event
         });
        // console.log(this.f.id_fuel_type_aux_1.value);
    }

    changeflag(event): void {  
        console.log(event)
        this.addvesselForm.patchValue({
            flag: event
         });
        // console.log(this.f.flag.value);
    }

    public selectedRoleList = [];
    public innerSelectData = [];
    changeSelectAccess(event, data): void {
        const checked = event.checked;
        console.log(event);
        console.log(data);
        for (let selectitem of this.roleAccessListData) {
            if (selectitem === data) {
                if (selectitem.selected === true) {
                    selectitem.selected = checked;
                    // this.selectedRoleList.push(selectitem);
                    for (let innerLoop of selectitem.alertdata) {
                        innerLoop.selected = true;
                    }
                } else {
                    var index = this.selectedRoleList.indexOf(selectitem);
                    this.selectedRoleList.splice(index, 1);
                    for (let innerLoop of selectitem.alertdata) {
                        innerLoop.selected = false;
                    }
                }

            } else {
                for (let innerList of selectitem.alertdata) {
                    // selectitem.selected = false;
                    if (selectitem.id === innerList.parentId) {
                        if (selectitem.selected === true) {
                            selectitem.selected = false;
                            var index = this.selectedRoleList.indexOf(selectitem);
                            this.selectedRoleList.splice(index, 1);

                        } else {
                            console.log('inner');
                            if (data.parentId === innerList.parentId && data.categoryName === innerList.categoryName) {
                                if (event.checked === true) {
                                    console.log('inner check');
                                    innerList.selected = checked;
                                    // this.innerSelectData.push(data);
                                } else {
                                    console.log('inner uncheck');
                                    innerList.selected = checked;
                                    var index = this.innerSelectData.indexOf(innerList);
                                    this.innerSelectData.splice(index, 1);
                                }
                            }

                        }
                    }

                }
            }
        }
    }

}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('repassword');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};