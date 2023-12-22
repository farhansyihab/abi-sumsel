<template>
    
</template>
<script>
import { tableGenerator } from '../../components/htmlTableClass.js'
import { localData } from '../../../firebase/getLocalDataClass.js'
export default {
    name: 'dataAnggota',
    setup(){
        const state = reactive({
            dataTable: null,
            htmlTable: '',
        })
        return { state }
    },
    mounted() { this.ambilData()},
    methods: {
        ambilData(){
            const dataLokal     = new localData("dataAnggota");
            const dataTable     = dataLokal.getObjJSONData();
            const objTable      = new tableGenerator(dataTable);
            const strTable      = objTable.generateTable()
            this.state.htmlTable = strTable ;
            this.state.dataTable = dataTable ;
        }
    }
}
</script>