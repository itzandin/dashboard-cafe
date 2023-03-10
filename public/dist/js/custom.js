$(document).ready(function () {
    $('.dtTable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
    });
});

// pilih customer
function pilih_customer(id_cus, kd_cus, nm_cus){
    $("#member").html(nm_cus + "("+kd_cus +")");
    $("#modal-customer").modal('hide');
    $("txtCusId").val(id_cus)
    var diskon = 1500;
    $("#diskon").html("<span>Rp</span>"+ number_format(diskon));
    $("#txtDiskon").val(diskon);
    // update g total
    grandtotal();
}

// pilih menu
function add_menu(id_menu, nm_mn, harga_menu ){
    // clone template
    $item = $("#tmp-menu").clone();
    $item.show()

    // isi setiap bagian
    if ($("#mn-" + id_menu).length == 0) {
        // jika menu belum ada
        $item.attr("id","mn-" + id_menu);
        $item.find(".jumlah").attr("data-id", "#mn-" + id_menu);
        $item.find(".delete").attr("data-id", "#mn-" + id_menu);
        $item.find(".item").find("h4").html(nm_mn);
        $item.find(".price").find("h4").html("<span>Rp</span>" +harga_menu);
        $(".detail").append($item);
        // data di isikan ke masing masing input
        $(".txtID").val(id_menu);
        $(".txtNama").val(nm_mn);
        $(".txtHarga").val(harga_menu);
    } else {
        // jika sudah ada update jumlah
        $jumlah = parseInt($("#mn-"+ id_menu).find(".jumlah").val()) +1; //ambil value
        $total = parseInt(harga_menu) * parseInt($jumlah);
        $("#mn-" + id_menu).find(".jumlah").val($jumlah);
        $("#mn-" + id_menu).find(".price").find("h4").html("<span>Rp</span>" + number_format($total));
    }
    // update gtotal
    grandtotal();
}
// ganti harga
function ganti_harga(e) {
    $id = $(e).attr("data-id");
    $jumlah = parseInt($(e).val());
    $harga = parseInt($item.find(".txtHarga").val());
    $total = $harga * $jumlah;

    $($id).find(".price").find("h4").html("<span>Rp</span>" + number_format($total));
    // update g total
    grandtotal();
}
// hapus menu
    function del_menu(e){
    $id = $(e).attr("data-id");
    $($id).remove();
    // update g tottal
        grandtotal();
    }

// hitung grand total

    function grandtotal(){
    var total = 0;
    var ppn = 0;
    $(".detail > .detail-item").each(function (e){
      var harga =    parseInt($(this).find(".txtHarga").val());
      var jumlah= parseInt($(this).find(".jumlah").val());
      total += (harga * jumlah); // total harga
        // console.log(harga + "/n" + jumlah);
    });
    // hitung total jumlah setelah dapat diskon
        total = total - parseInt($("#txtDiskon").val());
        // ppn 11 persen
        ppn = (11/100) * total;
        $('#ppn').html('<span>Rp</span>' + number_format(ppn));
        $('#txtPPN').val(ppn);
        console.log(total);
        // set grand total
        $("#amount").html('<span>Rp</span>' + number_format(total));
        $("#gtotal").val(total);
    }
    // format number
    function number_format(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
