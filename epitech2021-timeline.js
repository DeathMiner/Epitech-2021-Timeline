google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);
var today = new Date();

function date(day, month, year)
{
  return new Date(year, month - 1, day);
}

function sdate(day, month, year)
{
  return date(day, month, year);
}

function edate(day, month, year)
{
  var d = date(day, month, year);
  d.setDate(d.getDate() + 1);
  return d;
}

function drawChart() {
  var container = document.getElementById('timeline-container');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Module' })
  dataTable.addColumn({ type: 'string', id: 'Project' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows([
    [ '\0', 'Now', new Date(today.getFullYear(), today.getMonth(), today.getDate()), new Date(today.getFullYear(), today.getMonth(), today.getDate()) ],
    [ 'B4 - Shell Scripting ', 'ShellScript Project', sdate(22, 01, 2018), edate(28, 01, 2018)],
    [ 'B4 - Unix Programming - Memory', 'Malloc', sdate(22, 01, 2018), edate(11, 02, 2018)],
    [ 'B4 - Unix Programming - Memory', 'nm/objdump', sdate(12, 02, 2018), edate(25, 02, 2018)],
    [ 'B4 - C++(Part I)', 'NanoTekSpice', sdate(22, 01, 2018), edate(04, 03, 2018)],
    [ 'B4 - C++(Part I)', 'Aracade', sdate(05, 03, 2018), edate(08, 04, 2018)],
    [ 'B4 - FR - Écrits professionnels', 'Mission délicate: recadrer un collègue', sdate(29, 01, 2018), edate(11, 02, 2018)],
    [ 'B4 - FR - Écrits professionnels', 'Diaporama pour décrocher 1 million de dollars', sdate(19, 02, 2018), edate(04, 03, 2018)],
    [ 'B4 - FR - Écrits professionnels', 'Rediger un bilan d\'expérience', sdate(05, 03, 2018), edate(18, 03, 2018)],
    [ 'B4 - Computer Numerical Analysis - Trading', 'Bollinger bands', sdate(05, 02, 2018), edate(18, 03, 2018)],
    [ 'B4 - Computer Numerical Analysis - Trading', 'Trade', sdate(19, 03, 2018), edate(10, 06, 2018)],
    [ 'B4 - Mathematics', '201yams', sdate(12, 02, 2018), edate(25, 02, 2018)],
    [ 'B4 - Mathematics', '202invendus', sdate(26, 02, 2018), edate(11, 03, 2018)],
    [ 'B4 - Mathematics', '203hotline', sdate(12, 03, 2018), edate(25, 03, 2018)],
    [ 'B4 - Mathematics', '204canards', sdate(26, 03, 2018), edate(08, 04, 2018)],
    [ 'B4 - Mathematics', '205QI', sdate(09, 04, 2018), edate(22, 04, 2018)],
    [ 'B4 - Mathematics', '206neutrinos', sdate(23, 04, 2018), edate(06, 05, 2018)],
    [ 'B4 - Mathematics', '207demographie', sdate(07, 05, 2018), edate(20, 05, 2018)],
    [ 'B4 - Mathematics', '208chevillettes', sdate(14, 05, 2018), edate(27, 05, 2018)],
    [ 'B4 - Mathematics', '209sondage', sdate(21, 05, 2018), edate(03, 06, 2018)],
    [ 'B4 - x86-64 Assembly', 'MiniLibC', sdate(26, 02, 2018), edate(25, 03, 2018)],
    [ 'B4 - Unix Programming - Concurrency', 'Philosophers', sdate(26, 02, 2018), edate(11, 03, 2018)],
    [ 'B4 - Unix Programming - Concurrency', 'LemIPC', sdate(12, 03, 2018), edate(25, 03, 2018)],
    [ 'B4 - Unix Programming - Instrumentation', 'strace', sdate(26, 03, 2018), edate(08, 04, 2018)],
    [ 'B4 - Unix Programming - Instrumentation', 'ftrace', sdate(23, 04, 2018), edate(13, 05, 2018)],
    [ 'B4 - C++(Part II)', 'The Plazza', sdate(16, 04, 2018), edate(06, 05, 2018)],
    [ 'B4 - C++(Part II)', 'Indie Dtudio', sdate(07, 05, 2018), edate(10, 06, 2018)],
    [ 'B4 - Unix Programming - Network', 'MyFTP', sdate(16, 04, 2018), edate(29, 04, 2018)],
    [ 'B4 - Unix Programming - Network', 'MyIRC', sdate(07, 05, 2018), edate(27, 05, 2018)],
    [ 'B4 - Unix Programming - Network', 'Zappy', sdate(28, 05, 2018), edate(24, 06, 2018)]
  ]);


  chart.draw(dataTable, {
    timeline: {
      colorByRowLabel: true
    }
  });

  nowLine('timeline-container');

  google.visualization.events.addListener(chart, 'onmouseover', function(obj){
    if(obj.row == 0){
      $('.google-visualization-tooltip').css('display', 'none');
    }
    nowLine('timeline-container');
  })

  google.visualization.events.addListener(chart, 'onmouseout', function(obj){
    nowLine('timeline-container');
  })
}

function nowLine(div) {

    //get the height of the timeline div
    var height;
    $('#' + div + ' rect').each(function(index) {
        var x = parseFloat($(this).attr('x'));
        var y = parseFloat($(this).attr('y'));

        if (x == 0 && y == 0) {
            height = parseFloat($(this).attr('height'))
        }
    })

    var nowWord = $('#' + div + ' text:contains("Now")');

    nowWord.prev().first().attr('height', height + 'px').attr('width', '1px').attr('y', '0');
    // add this line to remove the display:none style on the vertical line
    $('#' + div + '  text:contains("Now")').each(function(idx, value) {
        if (idx == 0) {
            $(value).parent().find("rect").first().removeAttr("style");
        } else if (idx == 1) {
            $(value).parent().find("rect").first().attr("style", "display:none;");
        }

    });
}

$(document).ready(function(){
  $.getJSON("https://api.github.com/repos/DeathMiner/Epitech-2021-Timeline/commits", function(json){
    var msg, el, date;

    $("#changelog-container").empty();

    for (var i = 0; i < json.length; i++) {
      msg = json[i].commit.message.split("\n");
      date = moment(json[i].commit.committer.date);
      el = $(`<p class="commit">
<a href="${json[i].html_url}" target="_blank" class="commit-msg">${msg[0]}</a>
<span title="${date.format("dddd, MMMM Do YYYY, h:mm:ss a")}" class="commit-date">${date.fromNow()}</span>
</p>`);
      if (msg.length > 1){
        for (var j = msg.length - 1; j >= 1; j--) {
          if (msg[j].length > 0){
            el.addClass("expanded");
            el.find("a").after(`<span class="commit-desc">${msg[j]}</span>`);
          }
        }
      }
      el.appendTo($("#changelog-container"));
    }

    if (json.length <= 0){
      $("#changelog-container").text("No commits !? xO");
    }
  })
  .fail(function(){
    $("#changelog-container").text("Error while loading changelog :'(");
  });

  function set_theme(dark){
    var dark = dark || false;

    window.localStorage.setItem("dark", dark);

    if (dark){
      $("body").addClass("dark");
      $("#switch").text("Switch to light");
    }
    else{
      $("body").removeClass("dark");
      $("#switch").text("Switch to dark");
    }
  }

  $("#switch").on("click", function(){
    set_theme(!$("body").hasClass("dark"));
    return false;
  })

  set_theme(window.localStorage.getItem("dark") == "true" ? true : false);
});
