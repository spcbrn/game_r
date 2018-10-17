function setState(type,idx)
{
    console.log(" setState::: "+type+","+idx+" < ");
    $.ajax({
        type: "POST",
        url: "https://wwwforms.suralink.com/utahjs.php",
        data: {
            secret: 'utahJs',
            command: 'admin',
            adminCommand: 'setState',
            sKey: 'utahJs1234',
            state: currentState
        },
        success: function(data) 
        {
            var returnObj = $.parseJSON(data);
            console.log(" set state finished : ",returnObj);
            if(returnObj.success)
            {
                console.log(" ok now what!!!!!!!! ");
            }
            else if(returnObj.error) { showErrorMessage(returnObj.msg); }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
    });
    console.log(" set state all done... ");
}

function getStateTest()
{
    console.log(" getStateTest() ");
    $.ajax({
        type: "POST",
        url: "https://wwwforms.suralink.com/utahjs.php",
        data: {
            secret: 'utahJs',
            command: 'admin',
            adminCommand: 'getState',
            sKey: 'utahJs1234'
        },
        success: function(data) 
        {
            var returnObj = $.parseJSON(data);
            console.log(" get state finished : ",returnObj);
            if(returnObj.success)
            {
                console.log(" ok now what!!!!!!!! ");
            }
            else if(returnObj.error) { showErrorMessage(returnObj.msg); }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { if(XMLHttpRequest.status != 0) alert('error : heart beat. '+textStatus); }
    });
    console.log(" get state all done... ");
}