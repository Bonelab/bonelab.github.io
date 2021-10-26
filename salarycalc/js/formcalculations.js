

function calculateSalary()
{
    // policy variables
    var minStipend = parseFloat(document.getElementById("min_stipend").value);
    var minSuppl = parseFloat(document.getElementById("min_suppl").value);
    var percShare = parseFloat(document.getElementById("perc_share").value);
    var max_salary = parseFloat(document.getElementById("max").value);

    // award variables
    var totAwards = parseFloat(document.getElementById("tot_awards").value);
    var totTA = parseFloat(document.getElementById("tot_ta").value);

    // salary variable objects
    var totAnnPayObj = document.getElementById("tot_ann_pay");
    var grantSuppAnnObj = document.getElementById("grant_supp_ann");
    var grantSuppTermObj = document.getElementById("grant_supp_term");
    var grantSuppMonObj = document.getElementById("grant_supp_mon");

    // calculate grant supplement

    var grantSuppAnn =
      Math.max(minStipend - (totAwards + totTA/2),0)
      + Math.min(percShare*(totAwards+totTA/2),minSuppl);

    // output salary details

    totAnnPayObj.value = (grantSuppAnn+totAwards+totTA).toFixed(2);

    grantSuppAnnObj.value = grantSuppAnn.toFixed(2);
    grantSuppTermObj.value = (grantSuppAnn/3).toFixed(2);
    grantSuppMonObj.value = (grantSuppAnn/12).toFixed(2);




}
