<template>
    <container>
        <div style="margin-left: 50px; padding: 10px 0 10px 0;">
            <span>Untuk melihat tampilan lebih responsif mengikuti ukuran layar, klik disini </span>
            <router-link :to="{ name: 'ptdm2023'}" class="btn btn-primary">Buka</router-link>
        </div>
        <div style="margin-left: 50px; padding: 10px 0 10px 0;">
            Terhitung sejak tanggal 2 Juni 2023 (dua minggu sebelum PTD)
            Pendaftaran PTD 2023 <B>DITUTUP</B>
        </div>
        <iframe 
            src="/ptd2023/index.html" 
            frameborder="0" 
            marginwidth="0"
            height="1100px"
            width="100%">
        </iframe>
    </container>
</template>
<script>
export default { name: 'ptd2023',}
</script>