<template>
    <div class="container">
        <div class="row">
            <div class="form-floating col-7">
                <input 
                    @keyup="filterData"
                    v-model="state.fieldFilter" 
                    type="text" 
                    class="form-control" 
                    id="floatingInput" 
                    placeholder="nama anggota">
                <label for="floatingInput">Cari nama anggota</label>
            </div>
            <div class="col-5">
                <button @click="filterData" type="button" class="btn btn-primary">Cari</button>
            </div>
        </div>

        <div v-html="state.htmlTable"></div>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { tableGenerator } from '../../components/htmlTableClass.js'
import { localData } from '../../../firebase/getLocalDataClass.js'
export default {
    name: 'dataAnggota',
    setup(){
        const state = reactive({
            dataTable: null,
            htmlTable: '',
            fieldFilter: ''
        })
        return { state }
    },
    mounted() { this.ambilData()},
    methods: {
        ambilData(){
            const baseURL       = window.location.origin + '/' ;
            const dataLokal     = new localData("dataAnggota");
            const dataTable     = dataLokal.getObjJSONData();
            const mappedData    = dataTable.map((currValue, index) => ({
                No:(index+1), 
                Nama:`<a href=${baseURL}/detailanggota/${index}>${currValue.nama}</a>`
            }) );
            const objTable      = new tableGenerator(mappedData);
            const strTable      = objTable.generateTable();
            this.state.htmlTable = strTable ;
            this.state.dataTable = mappedData ;
        },
        filterData(){
            const strFilter     = this.state.fieldFilter
            const sourceData    = this.state.dataTable;
            const filteredData  = sourceData.filter( (datanya) =>{
                return datanya.Nama.toLowerCase().includes(strFilter.toLowerCase())
            })
            const objTable      = new tableGenerator(filteredData);
            const strTable      = objTable.generateTable();
            this.state.htmlTable = strTable ;
        }
    }
}
</script>

<style scoped>
    .container{
        padding-top: 50px;
    }
</style>