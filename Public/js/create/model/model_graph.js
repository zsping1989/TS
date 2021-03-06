TS['link'] = TS['links']['joint'];

define(['jquery','lodash','backbone'],function(){
    TS.addLink();
    var V;
    requirejs(['joint'],function(joint){
        V = joint.V;
        var graph = new joint.dia.Graph;
        /* 画板 */
        var paper = new joint.dia.Paper({
            el: $('#paper'),
            width: '100%',
            height: 1000,
            gridSize: 20,
            model: graph,
            linkConnectionPoint: joint.util.shapePerimeterConnectionPoint
        });

        /* 数据库开始 */
        joint.shapes.basic.Cylinder = joint.shapes.basic.Generic.extend({

            markup: '<g class="rotatable"><g class="scalable"><path/></g><text/></g>',

            defaults: joint.util.deepSupplement({

                type: 'basic.Cylinder',
                size: { width: 40, height: 40 },
                attrs: {
                    'path': {
                        fill: '#FFFFFF', stroke: '#cbd2d7', 'stroke-width': 3,
                        d: [
                            'M 0 10 C 10 5, 30 5, 40 10 C 30 15, 10 15, 0 10',
                            'L 0 20',
                            'C 10 25, 30 25, 40 20',
                            'L 40 10'
                        ].join(' ')
                    },
                    'text': { fill: '#435460', 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .7, ref: 'path', 'y-alignment': 'middle', 'text-anchor': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
                }

            }, joint.shapes.basic.Generic.prototype.defaults)
        });


        var cylinder = new joint.shapes.basic.Cylinder({
            position: { x: 2, y: 75 },
            size: { width: 180, height: 150 },
            attrs: {
                text: { text: 'test数据库' }
            }
        });

        graph.addCell(cylinder);
        /* 数据库结束 */

        /* t_table表开始 */
        var t_table = new joint.shapes.basic.Rect({
            position: { x: 200, y: 2 },
            size: { width: 120, height: 90 },
            attrs: { text: { text: 't_table表' } }
        });
        graph.addCell(t_table);
        /* t_table表结束 */

        /* t_table_relation表 */
        var t_table_relation = new joint.shapes.basic.Rhombus({
            position: { x: 450, y: 2 },
            size: { width: 150, height: 90 },
            attrs: { text: { text: 't_table_relation表', 'font-size': 14 } }
        });
        graph.addCell(t_table_relation);

        var t_user = new joint.shapes.basic.Rect({
            position: { x: 200, y: 202 },
            size: { width: 120, height: 90 },
            attrs: { text: { text: 't_user表' } }
        });
        graph.addCell(t_user);

        var t_admin_user = new joint.shapes.basic.Rect({
            position: { x: 200, y: 402 },
            size: { width: 120, height: 90 },
            attrs: { text: { text: 't_admin_user表' } }
        });
        graph.addCell(t_admin_user);

        var t_role = new joint.shapes.basic.Rect({
            position: { x: 450, y: 402 },
            size: { width: 120, height: 90 },
            attrs: { text: { text: 't_role表' } }
        });
        graph.addCell(t_role);


        var t_role_power = new joint.shapes.basic.Rhombus({
            position: { x: 700, y: 502 },
            size: { width: 150, height: 90 },
            attrs: { text: { text: 't_role_power表', 'font-size': 14 } }
        });
        graph.addCell(t_role_power);

        var t_power = new joint.shapes.basic.Rect({
            position: { x: 200, y: 602 },
            size: { width: 120, height: 90 },
            attrs: { text: { text: 't_power表' } }
        });
        graph.addCell(t_power);

        var l1 = new joint.dia.Link({
            source: { id: t_admin_user.id }, target: { id: t_role.id },
            attrs: {
                // @TODO: scale(0) fails in Firefox
                '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
                '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
            }
        });
        graph.addCells([l1]);



        paper.on('cell:pointerdown', function(cellView) {

            cellView.model.trigger('signal', cellView.model);
        });



        graph.on('signal', function(cell, data) {

            if (cell instanceof joint.dia.Link) {

                var targetCell = graph.getCell(cell.get('target').id);

                paper.findViewByModel(cell).sendToken(V('circle', { r: 7, fill: 'green' }).node, 1000, function() {
                    targetCell.trigger('signal', targetCell);
                });

            } else {

                flash(cell);
                var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
                _.each(outboundLinks, function(link) {
                    link.trigger('signal', link);
                });
            }
        });

        function flash(cell) {

            var cellView = paper.findViewByModel(cell);
            cellView.highlight();
            _.delay(function() { cellView.unhighlight(); }, 200);
        }







    });
    var  bind = {};


    function init(){
        for(var i in bind){
            bind[i]();
        }
    }
    return {
        init:init
    };
});

