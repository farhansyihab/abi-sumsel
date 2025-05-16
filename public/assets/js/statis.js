const bagAtas = `
<section id="topbar" class="topbar d-flex align-items-center">
	<div class="container d-flex justify-content-center justify-content-md-between" ><div class="contact-info d-flex align-items-center" ><i class="bi bi-envelope d-flex align-items-center" ><a href="mailto:ahmadz18637@gmail.com" >ahmadz18637@gmail.com</a></i><i class="bi bi-phone d-flex align-items-center ms-4" ><span >+62 851 6355 9153</span></i></div><div class="social-links d-none d-md-flex align-items-center" ><a href="#" class="twitter" ><i class="bi bi-twitter" ></i></a><a href="#" class="facebook" ><i class="bi bi-facebook" ></i></a><a href="#" class="instagram" ><i class="bi bi-instagram" ></i></a><a href="#" class="whatsapp" ><i class="bi bi-whatsapp" ></i></a></div></div>
</section>
<header  id="header" class="header">
	<nav  id="navbar" class="navbar navbar-expand-lg"><div  class="container-fluid"><a  class="navbar-brand" href="/" style="font-size: 20px;"><a  href="/" class="router-link-active router-link-exact-active" aria-current="page">ABI SUMSEL</a></a><button  class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarOPMD" aria-controls="navbarOPMD" aria-expanded="false" aria-label="Toggle navigation"><span  class="navbar-toggler-icon"></span></button><div  class="collapse navbar-collapse" id="navbarOPMD"><ul  class="navbar-nav me-auto mb-2 mb-lg-0"><li  class="nav-item"><a  href="/" class="router-link-active router-link-exact-active" aria-current="page">Beranda</a></li><li  class="nav-item"><a  href="/about" class="">About</a></li><li  class="nav-item"><a  href="/team" class="">Pengurus OPMD</a></li><li  class="nav-item"><a  href="/info" class="">Info</a></li><li  class="nav-item dropdown"><a  class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pendaftaran</a><ul  class="dropdown-menu" aria-labelledby="navbarScrollingDropdown"><li ><a  href="https://docs.google.com/forms/d/e/1FAIpQLScCCAuAxXt7qNFpILq4LeWuAuTMbETSe4FdRqvCLpuX31-ZxQ/viewform">SIANGGA</a></li><li ><a  href="/pendaftaran/ptd" class="">PTD</a></li><li ><a  href="/ptm" class="">PTM</a></li></ul></li><li  class="nav-item"><a  href="/kontak" class="">Kontak Kami</a></li><li  class="nav-item"><a  href="/login" class="nav-item nav-link" class-active="active">Login</a></li><!----></ul></div></div></nav>
</header>
`;
const headerSection = document.getElementById('atas');
headerSection.innerHTML = bagAtas;

const bagFooter = `
<!-- ======= Footer ======= -->
<footer id="footer" class="footer">
  <div class="container mt-4">
  <div class="copyright">
	  &copy; Copyright <strong><span>OPMD ABI</span></strong>. All Rights Reserved
  </div>
  <div class="credits">
	  Created by <a href="https://agiptek.com/">Agiptek</a>
  </div>
  </div>

</footer><!-- End Footer -->
<!-- End Footer --> 
`;
const footerSection = document.getElementById('bawah');
footerSection.innerHTML = bagFooter;

const fullURL   = window.location.href ;
const sosmedShare = `<div class="container"><div class="social-links d-flex flex-row-reverse align-items-center"><div><a href="#" class="twitter"><i class="bi bi-twitter"></i></a></div> &nbsp;&nbsp; <div class="fb-share-button" data-href="${fullURL}" data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${fullURL};src=sdkpreparse" class="fb-xfbml-parse-ignore"><i class="bi bi-facebook"></i></a></div> &nbsp;&nbsp; <div><a href="#" class="instagram"><i class="bi bi-instagram"></i></a></div> &nbsp;&nbsp; <div><a href="https://api.whatsapp.com/send?text=${fullURL}" data-action="share/whatsapp/share" class="whatsapp"><i class="bi bi-whatsapp"></i></a></div></div></div>`
const sosmedSection = document.getElementById('sosmed');
sosmedSection.innerHTML = sosmedShare;