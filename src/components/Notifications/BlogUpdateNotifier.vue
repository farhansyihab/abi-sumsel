// BlogUpdateNotifier.vue
<template>
    <!-- Update Notification -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100;" v-if="showUpdate">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-primary text-white">
                <strong class="me-auto">Pembaruan Konten</strong>
                <small>Baru saja</small>
                <button type="button" class="btn-close btn-close-white" @click="dismissUpdate"></button>
            </div>
            <div class="toast-body">
                <p>Ada berita terbaru yang tersedia!</p>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-sm btn-outline-light me-2" @click="dismissUpdate">Nanti</button>
                    <button type="button" class="btn btn-sm btn-light" @click="refreshData">Muat Sekarang</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cache Notification -->
    <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 1100;" v-if="showCache" @click="dismissCache">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-warning text-dark">
                <strong class="me-auto">Mode Offline</strong>
                <small>Peringatan</small>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Menggunakan data cache karena koneksi bermasalah.
            </div>
        </div>
    </div>

    <!-- Error Notification -->
    <div class="position-fixed bottom-0 start-50 translate-middle-x p-3" style="z-index: 1100;" v-if="showError" @click="dismissError">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-danger text-white">
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Gagal memuat data blog. Silakan coba lagi nanti.
            </div>
        </div>
    </div>
</template>

<script>
import blogKey from '../../firebase/DataService.js';
export default {
    data() {
        return {
            showUpdate: false,
            showCache: false,
            showError: false
        };
    },
    methods: {
        dismissUpdate() {
            this.showUpdate = false;
        },
        dismissCache() {
            this.showCache = false;
        },
        dismissError() {
            this.showError = false;
        },
        refreshData() {
            this.$emit('refresh');
            this.dismissUpdate();
        }
    },
    mounted() {
        // const baseURL   = window.location.origin + '/';
        if (window.Worker) {
            this.worker = new Worker(new URL('@/workers/blog.worker.js', import.meta.url), { 
                type: 'module' 
            });
            
            this.worker.postMessage(blogKey());
        
            this.worker.onmessage = (e) => {
                if (e.data.success) {
                    if (e.data.wasUpdated) {
                        this.showUpdate = true;
                    }
                    if (e.data.fromCache) {
                        this.showCache = true;
                        setTimeout(this.dismissCache, 5000);
                    }
                } else {
                    this.showError = true;
                    setTimeout(this.dismissError, 5000);
                }
            };
        }else{
            console.error('Browser tidak mendukung Web Worker');
        }

    }
};
</script>