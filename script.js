var formId = 's5a86d306b1008';

var rowLength = document.getElementById('field_widget_'+ formId +'_shopOrderRows').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

var order = {};
order.rows = [];

var i = 0;
while (i < rowLength) {
    order.rows.push(readDataFromRow(formId, i));
    i++;
}
console.log(order);
readOrderDeliveryData(formId);





order.rows.forEach(function(elem, i) {
    document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantQuantity').onblur= function ()
    {

        var value = this.value;
        value = parsePrice(value, 0);
        this.value = value;
        
        if(isNaN(value) || value <= 0){
            addInvalidClass(this);
            
            this.value = order.rows[i].wariantQuantity;
            console.log(value, 'Quantity value should contains digits only!');
        }else{  
            order.rows[i].wariantQuantity = value;
            
            recalculateSummary();
            addValidClass(this);
      
        }
    }

    document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantPriceNetto').onblur = function ()
    {
        var value = this.value;
        value = changePrice(value);
        this.value = value;

        if (value.match(/^\d{0,10}(\.\d{0,2})?$/) )
        {
            value = parseFloat(changePrice(value));
            this.value = value;
            if (value > order.rows[i].wariantPromotionPriceNetto) 
            {
                value = addZeroes(value);
                order.rows[i].wariantPriceNetto = value;
                order.rows[i] = recalculateRow(order.rows[i], i);
                addValidClass(this);
                recalculateSummary();
               
            }
            else {
                if (  parseFloat(order.rows[i].wariantPriceNetto) >  parseFloat(order.rows[i].wariantPromotionPriceNetto) )
                {
                    value = order.rows[i].wariantPriceNetto;
                }
                else {
                    if (order.rows[i].wariantPromotionPriceNetto === null)
                    {
                        
                        value = order.rows[i].wariantPriceNetto;
                    }
                    else {
                        value = order.rows[i].wariantPromotionPriceNetto;
                    }
                }
                
                addInvalidClass(this);
            }

            this.value = value;

        }
        else 
        {
            
            this.value = order.rows[i].wariantPriceNetto
            addInvalidClass(this);
        }

       
    }

    document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantPromotionPriceNetto').onblur = function ()
    {
        var value = this.value;
        var originalValue = value;
        value = parsePrice(value);
        this.value = value;
        console.log('reg', originalValue.match(/^\d{0,10}(\.\d{0,2})?$/));
        if ( value.length==0 ) {
            order.rows[i].wariantPromotionPriceNetto = null;
            this.value = "";
            order.rows[i] = recalculateRow(order.rows[i], i);
            recalculateSummary();
            console.log('promotion1', value);
        }
        else {
            console.log('tutaj');
            console.log( 'orignal', originalValue);
            if (isNaN(value)) {

                order.rows[i].wariantPromotionPriceNetto = null;
                this.value = "";
                
                order.rows[i] = recalculateRow(order.rows[i], i);
                recalculateSummary();
                console.log('promotion2', value);
                addValidClass(this);
            }
                // addInvalidClass(this); 
            else if (originalValue.match(/^\d{0,10}(\.\d{0,2})?$/) === null || value < 0) 
            {
                this.value = order.rows[i].wariantPromotionPriceNetto;
                addInvalidClass(this);
                console.log('promotion3', value);
            } 
            
            else {
                if (parseFloat(value) < parseFloat(order.rows[i].wariantPriceNetto)){
                    changePrice(value, 2);
                    value = addZeroes(value);
                    order.rows[i].wariantPromotionPriceNetto = value;
                    order.rows[i] = recalculateRow(order.rows[i], i);
                    
                    addValidClass(this);
                    recalculateSummary();
                    console.log('promotion4', value);
                }
                else {
                    this.value = order.rows[i].wariantPromotionPriceNetto;
                    addInvalidClass(this);
                }
            }
        }
       
    }
    // document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantPriceNetto').onblur = function ()
    // {
    //     var value = this.value;
    //     value = addZeroes(value);
    //     this.value = value;
    // }

    // document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantPromotionPriceNetto').onkeyup = function ()
    // {
    // var value = this.value;
    // value = changePrice(value);
    // this.value = value; 

    // if (value.match(/^\d{0,10}(\.\d{0,2})?$/) && (parseFloat(value) < parseFloat(order.rows[i].wariantPriceNetto)))
    // {
    //     order.rows[i].wariantPromotionPriceNetto = value;
    //     // order.rows[i] = recalculateRow(order.rows[i], i);
    //     addValidClass(this);
    //     // recalculateSummary();
    //     console.log(order);
    // }
    // else 
    // {
    //    this.value = order.rows[i].wariantPromotionPriceNetto;
    //     addInvalidClass(this);  
       
  
    //     // if(value.length>0)
    //     // {
    //     //     addInvalidClass(this);    
    //     // }    
    // }
    // }


    //    document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantPromotionPriceNetto').onblur = function ()
    // {
    //     if (order.rows[i].wariantPromotionPriceNetto = null)
    //     {
    //         this.value=null
    //     }
    //     else {
    //     var value = this.value;
    //     value = addZeroes(value);
    //     this.value = value;
    //     }
    // }

    document.getElementById(formId + '_shopOrderRows_' + i +  '_wariantVat').onblur= function ()
    {
        var value = this.value;
        value = parsePrice(value, 0);
        this.value = value;
        if (isNaN(value) || value < 0) {
            this.value = order.rows[i].wariantVat;
            addInvalidClass(this);
            console.log('vat1', value);
        }
        else {

            this.value = changeVat(value);
            console.log('vat2', value);

            if (100 > value > 0) {
                order.rows[i].wariantVat = value; 
                order.rows[i] = recalculateRow(order.rows[i], i);
                console.log('vat3', value);
                recalculateSummary();
            }
            else {
                this.value = order.rows[i].wariantVat;
                console.log('vat4', value);
            }
            addValidClass(this);
        }
        // if (value.match(/^\d{0,3}(\.\d{0,2})?$/))
        // {
        //     order.rows[i].wariantVat = value;
        //     order.rows[i] = recalculateRow(order.rows[i], i);
        //     addValidClass(this);
        //     recalculateSummary();
        //     console.log(order);
        // }
        // else 
        // {
        //     addInvalidClass(this);
        //     console.log('Vat value shouldnt contain any letters and optionaly it should contain two digits after decimal point')
        // }
    }

});
function readOrderDeliveryData(formId)
{
    var deliveryData = 
    {
        deliveryUnitCostNetto: document.getElementById(formId + '_deliveryTotalCostNetto').value,
        deliveryQuantity: document.getElementById(formId + '_deliveryTotalQuantity').value,
  
        deliveryVat: document.getElementById(formId + '_deliveryTotalVatValue').value ,
        deliveryTotalBrutto: document.getElementById(formId + '_deliveryTotalCostBrutto').value
    }

    order.deliveryData = deliveryData;
    console.log(deliveryData);

    // recalculateDelivery();
}

function recalculateSummary()
{

    var orderSummary = 
    {
        totalNetto: calculateTotalNetto(),
        totalVatValue: calculateTotalVatValue(),
    }

    order.summary = orderSummary;

    order.summary.totalBrutto = parsePrice(parseFloat(order.summary.totalNetto) + parseFloat(order.summary.totalVatValue)); 
    order.summary.totalBruttoWithDeliveryAndPayment = parsePrice(parseFloat(order.deliveryData.deliveryTotalBrutto) + parseFloat(order.summary.totalBrutto));
   
    writeSummary();
    

   // orderSummary.totalBruttoWithDeliveryAndPayment = parseFloat(orderTotalBrutto)
}


function writeSummary()
{
    document.getElementById(formId + '_totalBruttoWithDeliveryAndPayment').value = order.summary.totalBruttoWithDeliveryAndPayment;   
    document.getElementById(formId + '_totalBrutto').value = order.summary.totalBrutto;   
    document.getElementById(formId + '_totalNetto').value = order.summary.totalNetto;
    document.getElementById(formId + '_totalVatValue').value = order.summary.totalVatValue;
 
}

function readDataFromRow(formId, i)
{
    var produkt = {
        productId: document.getElementById(formId + '_shopOrderRows_' + i + '_productId').value,
        wariantQuantity: document.getElementById(formId + '_shopOrderRows_' + i + '_wariantQuantity').value,
        wariantPriceNetto: document.getElementById(formId + '_shopOrderRows_' + i + '_wariantPriceNetto').value,
        wariantPromotionPriceNetto: document.getElementById(formId + '_shopOrderRows_' + i + '_wariantPromotionPriceNetto').value,
        wariantVat: document.getElementById(formId + '_shopOrderRows_' + i + '_wariantVat').value
    };

  // produkt = recalculateRow(produkt, i);
    return produkt;
}



function writeRow(produkt, i) 
{   
    console.log('promotion', produkt.wariantPromotionPriceNetto)

    document.getElementById(formId + '_shopOrderRows_' + i +'_wariantPromotionPriceBrutto').value = parsePrice(produkt.wariantPromotionPriceBrutto);
    document.getElementById(formId + '_shopOrderRows_' + i +'_wariantPriceBrutto').value = parsePrice(produkt.wariantPriceBrutto);
  
   
    }

function calculateVatValue(priceNetto, vatPercent)          
{   
    if (parseFloat(vatPercent) <= 0 ) 
    {
        return 0;
    }
    return (parseFloat(vatPercent)/100) * parseFloat(priceNetto);
}




function recalculateRow(produkt, i)
{

    if(parseFloat(produkt.wariantPriceNetto) > parseFloat(produkt.wariantPromotionPriceNetto) )
    {
        produkt.vatValue = calculateVatValue(produkt.wariantPromotionPriceNetto,produkt.wariantVat);
    }
    else
    {
        produkt.vatValue = calculateVatValue(produkt.wariantPriceNetto,produkt.wariantVat);
    }

    produkt.wariantPromotionPriceBrutto = calculatePriceBrutto(produkt.wariantPromotionPriceNetto,produkt.wariantVat);
    produkt.wariantPriceBrutto = calculatePriceBrutto(produkt.wariantPriceNetto,produkt.wariantVat);

    writeRow(produkt,i);
    console.log(produkt);
    return produkt;

}

function calculatePriceBrutto(wariantPriceNetto, wariantVat)        
{   
    
        return parseFloat(wariantPriceNetto) + calculateVatValue(wariantPriceNetto, wariantVat);
        
}

function calculateTotalVatValue()
{
    var totalVatValue = 0;
    order.rows.forEach(function(elem){
        totalVatValue += parseFloat(elem.vatValue) * elem.wariantQuantity;
    }); 
    return parsePrice(totalVatValue);
    console.log(totalVatValue);
}

function calculateTotalNetto()
{
        var totalNetto = 0;
    
        order.rows.forEach(function(produkt){
            if ( parseFloat(produkt.wariantPromotionPriceBrutto) == null ) 
            {
                totalNetto += parseFloat(produkt.wariantPromotionPriceNetto) * parseFloat(produkt.wariantQuantity);
           
            }
            else 
            {
                if (parseFloat(produkt.wariantPromotionPriceNetto) > parseFloat(produkt.wariantPriceNetto)) {
                    totalNetto += parseFloat(produkt.wariantPriceNetto) * parseFloat(produkt.wariantQuantity);
                }
                else {
      
                    if (isNaN(produkt.wariantPromotionPriceBrutto)){
                        totalNetto += parseFloat(produkt.wariantPriceNetto) * parseFloat(produkt.wariantQuantity);
                    }
                    else {
                        totalNetto += parseFloat(produkt.wariantPromotionPriceNetto) * parseFloat(produkt.wariantQuantity);
                    }
                }
            }
            
        });
  
        console.log(totalNetto);
        return totalNetto;
}





function addZeroes( num ) {
    // console.log(num);
    // Cast as number
    var num = Number(num);
    // If not a number, return 0
    if (isNaN(num)) {
         return 0;
    }
    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
        num = num.toFixed(2);
    }
    // Return the number
    // console.log( num );
    return num;
 }

function addInvalidClass(elem) { 
    elem.classList.add('is-invalid');
    // console.log(elem);
}

function addValidClass(elem) { 
    elem.classList.remove('is-invalid');
    // console.log(elem);
}

function changePrice(elem) {
  
    elem = elem.replace(/,/g, ".");
    return elem;
}

function changeVat(elem) {
  
    elem = Math.floor(elem);
    return elem;
}

function parsePrice(price, precision = 2)
{       
    if(isNaN(price))
    {
        price = 0;
    }
    return Number.parseFloat(price).toFixed(precision);
  
}