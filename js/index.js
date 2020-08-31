$(function () {
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover();
        $('.carousel').carousel({
            interval: 2000
        });

        $('#loQuiero').on('show.bs.modal', function (e){
            console.log('el modal Lo quiero se está mostrando');

            $('#loQuieroBtn').removeClass('btn-outline-success');
            $('#loQuieroBtn').addClass('btn-primary');
            $('#loQuieroBtn').prop('disabled', true);

        });
        $('#loQuiero').on('shown.bs.modal', function (e){
            console.log('el modal Lo quiero se mostró');
        });
        $('#loQuiero').on('hide.bs.modal', function (e){
            console.log('el modal Lo quiero se oculta');
        });
        $('#loQuiero').on('hidden.bs.modal', function (e){
            console.log('el modal Lo quiero se ocultó');

            $('#loQuieroBtn').prop('disabled', false);
            $('#loQuieroBtn').removeClass('btn-primary');
            $('#loQuieroBtn').addClass('btn-outline-success');

        });

      });