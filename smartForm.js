// Your jQuery goes here

(function(smartForm, $) {

    smartForm.init = function() {
        smartForm.analytics();
    };

    smartForm.analytics = function() {
        var $smartForm = $('.js-smart-form');

        if (!$smartForm.length) {
            return;
        }

        var $smartFormInputs = $smartForm.find('input, select');
        if (!$smartFormInputs.length) {
            return;
        }

        var currentStep = $('.js-smartform-step').val();
        var activityName = 'SmartForm_Step' + currentStep + 'Interacted';

        $smartForm.find('input, select').change(function() {
            // Uses the js-cookie plugin.
            if (Cookies.get(activityName) === undefined) {
                Cookies.set(activityName, 'true');
                $.ajax({
                    type: 'GET',
                    url: '/api/Analytics/LogCustomActivity',
                    data: {
                        ActivityType: activityName
                    }
                });
            }
        });

    };

}(_.smartForm = _.smartForm || {}, jQuery));
