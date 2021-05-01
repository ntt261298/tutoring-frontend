/**
 *  All JavaScript routines for handling the Geogebra appplet
 *
 * See: http://wiki.geogebra.org/en/Reference:Applet_Parameter
 */

/**
 * Replace the blank div with the Geogebra java applet
 */
function geogebra_display ( id, self, url, base64 )
{
	var div = $(self).parent();  // Up to the geogebra-X div
    var applet = '';
    var style = ' style="width: 550px; height: 400px"';
    var object_tag = '<object id="geopic-' + id + '" ';
    var jar_file = "/system/plugins/geogebra/geogebra.jar";

    var params = '<param name="archive" value="' + jar_file + '" />' +
                 '<param name="java_code" value="geogebra.GeoGebraApplet" />' +
                 '<param name="java_codebase" value="." />' +
                 '<param name="filename" value="' + url + '" />' +
                 '<param name="framePossible" value="false" />';

    applet = object_tag + style + ' type="application/x-java-applet" archive="' + jar_file + '">' + params + '</object>';


	var attributes = [];
	attributes.push('id="geopic-' + id + '"');
	attributes.push('code="geogebra.GeoGebraApplet"');
	attributes.push('archive="geogebra.jar"');
	attributes.push('codebase="http://jars.geogebra.org/webstart/4.2/"');
	attributes.push('width="650"');
	attributes.push('height="400"');

	applet = [];
	applet.push("<applet " + attributes.join(" ") + ">");
	applet.push('<param name="ggbBase64" value="' + base64 + '" />');
	applet.push('Please install Java 1.6 (or later) from www.java.com to use this page.');
	applet.push('</applet>');


    div.html(applet.join(""));
    var controls = '<div class="geogebra-c">' +
                   '<input type="button" class="liteoption" value="Reset picture" onclick="geogebra_reset(' + id + ');" />' +
                   '<input type="button" class="liteoption" value="Hide picture" onclick="geogebra_hide(' + id + ', this);" />' +
                   '</div>';
    div.append(controls);
}


/**
 *  Hides the applet
 */
function geogebra_hide( id, self )
{
	$('#geopic-' + id).hide();
    $(self).parent().html('<input type="button" class="mainoption" value="Click to view applet" onclick="geogebra_show(' + id + ', this);" />');
}

/**
 *  Shows the applet
 */
function geogebra_show( id, self )
{
	var div = $(self).parent().parent();
	// applet container
	$('#geopic-' + id).show();

	$(self).parent().remove();
	div.append('<div class="geogebra-c"><input type="button" class="liteoption" value="Reset picture" onclick="geogebra_reset(\'p' + id + '\');" /><input type="button" class="liteoption" value="Hide picture" onclick="geogebra_hide(' + id + ', this);" /></div>');
}


/**
 *  Insert the picture in the textarea; requires an AJAX method
 *  The Object tag needs to have the object# specified apparently
 */

function geogebra_insert( element, in_wiki )
{

	xml_text = document.getElementById(element).getXML();

	// need the ajax call here
	$.post(
		"/system/plugins/geogebra/class_geogebra_ajax.php", {
			'class' : 'geogebra',
			'subdir' : 'geogebra',
			'xml_text' : xml_text,
			'in_wiki' : in_wiki
		},
		function(data){
            if ( data.msg != undefined )
			{
			    alert(data.msg);
			    return false;
			}
		    if ( confirm("Are you sure you want to insert this picture?") )
		    {
				ggb_sep_insert(data.bbcode, in_wiki);
				window.close();
			}
	  	},
		"json");
}

/**
 *  Reset button
 */
function geogebra_reset( element, flag )
{
	if ( flag == undefined || confirm('Are you sure you want to reset this picture?') )
	{
		$(element).parent().parent().find("object")[0].reset();
	}
}


/**
 *  The Geogebra insert in textarea post
 *
 *  @param Object txtarea
 *  @param String text
 */
/**
 *  Geogebra Separate Insert
 *
 *  @param String text
 *  @param Integer in_wiki
 */
function ggb_sep_insert( text, in_wiki )
{
	if ( opener != null )
	{
		if ( in_wiki )
		{
		    ggb_txt_insert(opener.document.forms['editform'].wpTextbox1, text);
		}
		else
		{
			ggb_txt_insert(opener.document.forms['postform'].message, text);
		}
	}
}

function ggb_txt_insert( txtarea, text )
{
	text = ' ' + text + ' ';
	if (txtarea.createTextRange && txtarea.caretPos)
	{
		var caretPos = txtarea.caretPos;
		var baseHeight;
		if ( ie )
		{
			baseHeight = document.selection.createRange().duplicate().boundingHeight;
		}
		if ( baseHeight != txtarea.caretPos.boundingHeight )
		{
			txtarea.focus();
			ggb_store_caret(txtarea);
		}
		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + text + ' ' : caretPos.text + text;
		txtarea.focus();
	}
	else if ( (txtarea.selectionEnd | txtarea.selectionEnd == 0) && (txtarea.selectionStart | txtarea.selectionStart == 0) )
	{
		ggb_moz_insert(txtarea, text, "");
	}
	else
	{
		txtarea.value  += text;
		txtarea.focus();
	}
}

/**
 *  Geogebra Mozilla Insert (we have to do something special for Firefox)
 *
 *  @param Object txtarea
 *  @param String openTag
 *  @param String closeTag
 */
function ggb_moz_insert( txtarea, openTag, closeTag )
{
	var scrollTop = ( typeof(txtarea.scrollTop) == 'number' ? txtarea.scrollTop : -1 );
	if (txtarea.selectionEnd > txtarea.value.length)
	{
		txtarea.selectionEnd = txtarea.value.length;
	}
	var startPos = txtarea.selectionStart;
	var endPos = txtarea.selectionEnd + openTag.length;

	txtarea.value = txtarea.value.slice(0, startPos) + openTag + txtarea.value.slice(startPos);
	txtarea.value = txtarea.value.slice(0, endPos) + closeTag + txtarea.value.slice(endPos);
	txtarea.selectionStart = startPos + openTag.length;
	txtarea.selectionEnd = endPos;
	txtarea.focus();

	if (scrollTop >= 0)
	{
		txtarea.scrollTop = scrollTop;
	}
}
/**
 *  Geogebra Store Caret
 *
 *  @param String textEl
 */
function ggb_store_caret( textEl )
{
	if (textEl.createTextRange) textEl.caretPos = document.selection.createRange().duplicate();
}
