
	/*
	Segunda Tarefa Prática - Computação Gráfica I 
	Alunos: Pedro Paulo Soares  Dre: 114153450
		Paula Macedo 	Dre: 113049909
	Professor: João Vitor de Oliveira Silva
	
	*/

function Bailarina() {}

Object.assign( Bailarina.prototype, {

    //Movimento Assemble da Bailarina
    init: function() {

        function upperArmTween(arm, negative){
            return new TWEEN.Tween( {theta:0} )
                .to( {theta:negative ? -Math.PI/4 : Math.PI/4}, 500)
                .onUpdate(function(){
                    let upper_arm = robot.getObjectByName(arm);
                    upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(negative ? -2.8 : 2.8, 1, 0 ) );
                    upper_arm.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }

        function lowerArmTween(arm, negative){
            return new TWEEN.Tween( {theta:0} )
                .to( {theta:negative ? -Math.PI/2 : Math.PI/2}, 500)
                .onUpdate(function(){
                    let lower_arm = robot.getObjectByName(arm).children[0];
                    lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(negative ? -1 : 1, -2, 0 ) );
                    lower_arm.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }

        function headTween(){
            return new TWEEN.Tween( {y:4.8} )
                .to( {y:5.0}, 500)
                .onUpdate(function(){
                    let head = robot.getObjectByName('head');
                    head.matrix.makeTranslation(0,this._object.y,0);
                    head.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }
        let upperLegTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:Math.PI/6}, 500) //Alterado o theta dado pelo trabalho para pi/2
        .onUpdate(function(){
            
            let right_upper_leg = robot.getObjectByName("right_upper_leg");
            right_upper_leg.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation( 1.8, - 4.8, 0 ) );
            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })

        let lowerLegTween = new TWEEN.Tween( {theta:0} )
        .to( {theta:- Math.PI/2}, 500) //Alterado o theta dado pelo trabalho para pi/2
        .onUpdate(function(){
            
            let right_lower_leg = robot.getObjectByName("right_upper_leg").children[0];
            right_lower_leg.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(-2, -1.8, 0 ) );
            // Updating final world matrix (with parent transforms) - mandatory
            right_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })
       
        let right_upper_arm = upperArmTween('right_upper_arm', false);
        let right_lower_arm = lowerArmTween('right_upper_arm', true);
        let left_upper_arm = upperArmTween('left_upper_arm', true);
        let left_lower_arm = lowerArmTween('left_upper_arm', false);
        let hd = headTween();

        right_upper_arm.chain(right_lower_arm);
        left_upper_arm.chain(left_lower_arm);
        hd.repeat(5);
        
        right_upper_arm.start()
        left_upper_arm.start()
        hd.start();

        upperLegTween.chain(lowerLegTween);
        upperLegTween.start();
        upperLegTween.repeat(5);
  
        
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});
