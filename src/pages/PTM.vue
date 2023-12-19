<template>
    <main id="main">
        <div class="container">
            <div>
                <div class="row" style="margin:20px !important;">
                    <div class="col-12">
                        <p>ABI akan menyelenggarakan Pendidikan Tingkat Menengah pada tanggal 10 November 2023 hingga 12 November 2023</p>
                        <P>Untuk pendaftaran, peserta dipersilahkan mengisi Form A01 dan A03</P>
                        <router-link :to="{ name: 'ptm2023'}">Silahkan lihat jadwal kegiatan PTM, klik disini</router-link>
                    </div>                
                </div>
            </div>            
        </div>
    </main>
</template>

<script>
export default {
    name: 'PTM',
}
</script>

<style scoped>
.hide { visibility: hidden !important; }
</style>