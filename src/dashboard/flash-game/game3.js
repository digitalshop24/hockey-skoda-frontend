'use strict';
import angular from "angular";

export default angular.module('dashboard.game-init', [])
    .directive('gameInit', function ($rootScope) {
        return {
            link: function () {





/* box2d_init by I hope you too. */


/*****
*
*	Preperation for use
*
*****/

var b2Vec2 = Box2D.Common.Math.b2Vec2
 , b2BodyDef = Box2D.Dynamics.b2BodyDef
 , b2Body = Box2D.Dynamics.b2Body
 , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
 , b2Fixture = Box2D.Dynamics.b2Fixture
 , b2World = Box2D.Dynamics.b2World
 , b2MassData = Box2D.Collision.Shapes.b2MassData
 , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
 , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
 , b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape
 , b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef
 , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
 , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
   ;

var box2d_scale = 30.0;
//var box2d_timeStep = 1.0 / 60.0;
var box2d_velocityIterations = 6;
var box2d_positionIterations = 2;
var box2d_world = new b2World( new b2Vec2(0.0 , 10.0) , true);
//prepare the collisions
var box2d_listener = new Box2D.Dynamics.b2ContactListener;
var box2d_destruction_listener = new Box2D.Dynamics.b2DestructionListener;
box2d_destruction_listener.SayGoodbyeFixture = function(fixture) {
	var _obj_ = fixture.GetBody().GetUserData();
	_obj_.instance_destroy();
}
box2d_world.SetDestructionListener(box2d_destruction_listener);

box2d_listener.BeginContact = function(_contact) {
	var _userA = _contact.GetFixtureA().GetBody().GetUserData();
	var _userB = _contact.GetFixtureB().GetBody().GetUserData();
	if(_userA.box2d_BeginContact !== undefined && _userA.box2d_BeginContact[_userB._object_index_] !== undefined){
		_userA.box2d_BeginContact[_userB._object_index_](_userA , _userB , _contact);
	}
	if(_userB.box2d_BeginContact !== undefined && _userB.box2d_BeginContact[_userA._object_index_] !== undefined){
		_userB.box2d_BeginContact[_userA._object_index_](_userB , _userA , _contact);
	}
}

box2d_listener.EndContact = function(_contact) {
	var _userA = _contact.GetFixtureA().GetBody().GetUserData();
	var _userB = _contact.GetFixtureB().GetBody().GetUserData();
	if(_userA.box2d_EndContact !== undefined && _userA.box2d_EndContact [_userB._object_index_] !== undefined){
		_userA.box2d_EndContact [_userB._object_index_](_userA , _userB , _contact);
	}
	if(_userB.box2d_EndContact !== undefined && _userB.box2d_EndContact[_userA._object_index_] !== undefined){
		_userB.box2d_EndContact[_userA._object_index_](_userB , _userA , _contact);
	}
}

box2d_listener.PreSolve = function(_contact , _oldManifold) {
	var _userA = _contact.GetFixtureA().GetBody().GetUserData();
	var _userB = _contact.GetFixtureB().GetBody().GetUserData();
	if(_userA != null && _userA.box2d_PreSolve !== undefined && _userA.box2d_PreSolve[_userB._object_index_] !== undefined){
		_userA.box2d_PreSolve[_userB._object_index_](_userA , _userB , _contact , _oldManifold);
	}
	if(_userB != null &&_userB.box2d_PreSolve !== undefined && _userB.box2d_PreSolve[_userA._object_index_] !== undefined){
		_userB.box2d_PreSolve[_userA._object_index_](_userB , _userA , _contact , _oldManifold);
	}
}

//We are going to use only PostSolve
box2d_listener.PostSolve = function(_contact , _impulse) {
	var _userA = _contact.GetFixtureA().GetBody().GetUserData();
	var _userB = _contact.GetFixtureB().GetBody().GetUserData();
	if(_userA.box2d_PostSolve !== undefined && _userA.box2d_PostSolve[_userB._object_index_] !== undefined){
		_userA.box2d_PostSolve[_userB._object_index_](_userA , _userB , _contact , _impulse);
	}
	if(_userB.box2d_PostSolve !== undefined && _userB.box2d_PostSolve[_userA._object_index_] !== undefined){
		_userB.box2d_PostSolve[_userA._object_index_](_userB , _userA , _contact , _impulse);
	}
}
box2d_world.SetContactListener(box2d_listener);



function box2d_get_data() {

	var _node = box2d_world.GetBodyList();
	while (_node) {
		var b = _node;
		_node = _node.GetNext();
		if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
			if (b.GetUserData().depth !== undefined) {
				var _this = b.GetUserData();
				var tmp_p = b.GetPosition();
				_this.box2d_body = b;
				_this.x = tmp_p.x * box2d_scale;
				_this.y = tmp_p.y * box2d_scale;
				_this.image_angle = radtodeg( b.GetAngle() );
				_this.on_step();
			} else {
				box2d_world.DestroyBody(b);
			}
		}
	}

}









function box2d_destroy_all() {
	var _node = box2d_world.GetBodyList();
	while (_node) {
		var b = _node;
		box2d_world.DestroyBody(b);
		_node = _node.GetNext();
	}
}








function box2d_extra_step() {

	// object step events:
	tu_trash = [];
	var _node = box2d_world.GetBodyList();
	while (_node) {
		var b = _node;
		_node = _node.GetNext();
		if (b.IsActive() && typeof b.GetUserData() !== undefined && b.GetUserData() != null) {
			//alert(undefined);
			var _obj_ = b.GetUserData();
			if (_obj_.box2d_is_dead === true) {
				box2d_world.DestroyBody(b);

			}
			if (b.GetUserData().box2d_is_dead !== true) {
				_obj_.box2d_body = b;
				_obj_.x = b.GetPosition().x * box2d_scale;
				_obj_.y = b.GetPosition().y * box2d_scale;
				_obj_.image_angle = radtodeg( b.GetAngle() );

				//var _obj_ = tu_depthc[tu_deptho];
				// is viewport object?
				if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
					tu_viewport_inst = _obj_;
				}
				// STEP:
				_obj_.on_step();
				// MOVE:

				//Here Must be the PostSolve collision
				// COLLISION:
				//_obj_.parent != null && _obj_.collision_overwritten == 0 ? _obj_.parent.__collision__.call(_obj_) : _obj_.__collision__();

				//END_STEP
				_obj_.on_end_step();

				// post:

				_obj_.xprevious = _obj_.x;
				_obj_.yprevious = _obj_.y;
			}

		}
	}
	// follow object
	if ( tu_viewport_inst != null ) {
		var _h = Math.min(room_viewport_hborder, room_viewport_width / 2);
		var _v = Math.min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
	box2d_world.Step( 1.0 / room_speed  , box2d_velocityIterations , box2d_positionIterations);

	box2d_world.ClearForces();

	//
}





/*******
*
*		TULULOO CORE FUNCTIONS
*
*******/

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else
		tu_step();
		box2d_extra_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}



function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	box2d_destroy_all();
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

/* box2d_init_helper by haramanai */


function rotate_vector( _v , _a) {
	var _x = _v.x;
	var _y = _v.y;
	_v.x = ( Math.cos(_a) * _x - Math.sin(_a) * _y );
	_v.y = ( Math.sin(_a) * _x + Math.cos(_a) * _y );
}



/****
*
*		The Origin of the sprite_index must be in the center of
*	the collision shape.
*
****/
function box2d_get_shape_from_sprite(_sprite_index) {

	if (_sprite_index.collision_shape==2)
	{
		var hx = ((_sprite_index.collision_right - _sprite_index.collision_left) / 2) / box2d_scale;
		var hy = ((_sprite_index.collision_bottom - _sprite_index.collision_top) / 2) / box2d_scale;
		var _shape = new b2PolygonShape;
		var _origin = new b2Vec2(hx - _sprite_index.xoffset / box2d_scale, hy - _sprite_index.yoffset / box2d_scale);
		_origin.Multiply( 1.0 / box2d_scale);
		_shape.SetAsBox( hx , hy , _origin);
		return _shape;
	}
	if (_sprite_index.collision_shape==3)
	{
		var _radius = _sprite_index.collision_radius / box2d_scale;
		var _shape = new b2CircleShape(_radius);
		return _shape;
	}


	//alert("Bad collision_shape=>" + _sprite_index.collision_shape);

}




/****
*
*		box2d_create_edges_from_tileset
*	Put this function inside an object.
*	pass the name of the background - tile set.
*	this will be your tile collision
*
****/
function box2d_create_edges_from_tileset(_layer , _object_pointer) {
	var _data;
	//check if we use _ts and transfer the data
	for (var i = 0; i < room_current.tiles.length; i ++){
		if (room_current.tiles[i][0]===_layer) {
			_data = room_current.tiles[i][1];
			break;
		}
		else {
			_data = null;
		}
	}

	if (_data == null) {
		alert("Wrong Layer number in : " + room_current);
		return false;
	}

	var _bodyDef = new b2BodyDef();
	_bodyDef.type = b2Body.b2_staticBody;
	_bodyDef.userData = _object_pointer;

	var _body = box2d_world.CreateBody(_bodyDef);

	var _fixDef = new b2FixtureDef;
	_fixDef.density = 1.0;
	_fixDef.friction = 0.5;
	_fixDef.restitution = 0.2;




	var _gs = new b2Vec2( _data[1][2] , _data[1][3] );
	var _off_set = new b2Vec2( _data[1][0] , _data[1][1]);
	var _grid_row = Math.round(room_width / _gs.x);
	var _grid_col = Math.round(room_height / _gs.y);

	//Create an All room grid of tiles.
	var _grid = new Array(_grid_row );
	for (var i = 0; i < _grid_row; i++) {
		_grid[i] = new Array( _grid_col);
	}

	//Mark the used tiles.
	for (var i = 1; i < _data.length; i++) {
		var _row = _data[i][4] / _gs.x;
		var _col = _data[i][5] / _gs.y;
		_grid[_row][_col] = new Array(4); //We will store the sides that will have an edge

	}

	// Now that we have a grid lets find and create our shapes.
	var _v = new Array();
	/*****
	*
	*	I wil run all grid loop for each axis.
	*	don't worry this is not a real time function
	*	it will run only in the begining of the room
	*	It will find all the edges and create them
	*
	****/
	// UP
	for( var _y = 0; _y < _grid_col; _y++ ) {
		for( var _x = 0; _x < _grid_row; _x++) {
			if( _grid[_x]&&_grid[_x][_y] ) {

				//Check up
				if ((_y - 1) >= 0 && _grid[_x][_y - 1]) {
					//if there is a grid don't create an edge
					continue;
				} else {
					_v[0] = new b2Vec2(_x * _gs.x , _y * _gs.y);
					_v[0].Multiply(1.0 / box2d_scale);
					_v[1] = new b2Vec2(_x * _gs.x + _gs.x , _y * _gs.y);
					_v[1].Multiply(1.0 / box2d_scale);
					//alert(_x + " out");
					while(_grid[_x] && _grid[_x][_y] && (_grid[_x][_y-1] === undefined)) {
						//alert(_x + " in");
						_v[1].Set(_x * _gs.x + _gs.x , _y * _gs.y);
						_v[1].Multiply(1.0 / box2d_scale);
						_x +=1;
					}
					if(_x>_grid_row) _x = _grid_row;

					//alert(_v[0].x + " , " + _v[0].y + " => " + _v[1].x + " , " + _v[1].y);
					_fixDef.shape = new b2PolygonShape;
					_fixDef.shape.SetAsEdge(_v[0] , _v[1]);
					_body.CreateFixture( _fixDef );
				}
			}
		}
	}

	// DOWN
	for( var _y = 0; _y < _grid_col; _y++ ) {
		for( var _x = 0; _x < _grid_row; _x++) {
			if( _grid[_x]&&_grid[_x][_y] ) {

				//Check Down
				if ((_y - 1) >= 0 && _grid[_x][_y + 1]) {
					//if there is a grid don't create an edge
					continue;
				} else {
					_v[0] = new b2Vec2(_x * _gs.x , _y * _gs.y + _gs.y);
					_v[0].Multiply(1.0 / box2d_scale);
					_v[1] = new b2Vec2(_x * _gs.x + _gs.x , _y * _gs.y + _gs.y);
					_v[1].Multiply(1.0 / box2d_scale);
					//alert(_x + " out");
					while(_grid[_x] && _grid[_x][_y] && (_grid[_x][_y+1] === undefined)) {
						//alert(_x + " in");
						_v[1].Set(_x * _gs.x + _gs.x , _y * _gs.y + _gs.y);
						_v[1].Multiply(1.0 / box2d_scale);
						_x +=1;
					}
					if(_x>_grid_row) _x = _grid_row;

					//alert(_v[0].x + " , " + _v[0].y + " => " + _v[1].x + " , " + _v[1].y);
					_fixDef.shape = new b2PolygonShape;
					_fixDef.shape.SetAsEdge(_v[0] , _v[1]);
					_body.CreateFixture( _fixDef );
				}
			}
		}
	}

	// Right
	for( var _x = 0; _x < _grid_row; _x++) {
		for( var _y = 0; _y < _grid_col; _y++ ) {
			if( _grid[_x]&&_grid[_x][_y] ) {
				//Check Right
				if (_grid[_x + 1] && _grid[_x + 1][_y]) {
					//if there is a grid don't create an edge
					continue;
				} else {
					_v[0] = new b2Vec2(_x * _gs.x + _gs.x , _y * _gs.y);
					_v[0].Multiply(1.0 / box2d_scale);
					_v[1] = new b2Vec2(_x * _gs.x + _gs.x , _y * _gs.y + _gs.y);
					_v[1].Multiply(1.0 / box2d_scale);
					//alert(_x + " out");
					while(_grid[_x + 1] && _grid[_x + 1][_y] && (_grid[_x + 1][_y+1] === undefined)) {
						//alert(_x + " in");
						_v[1].Set(_x * _gs.x + _gs.x , _y * _gs.y + _gs.y);
						_v[1].Multiply(1.0 / box2d_scale);
						_y +=1;
					}
					if(_y>_grid_col) _y = _grid_col;

					//alert(_v[0].x + " , " + _v[0].y + " => " + _v[1].x + " , " + _v[1].y);
					_fixDef.shape = new b2PolygonShape;
					_fixDef.shape.SetAsEdge(_v[0] , _v[1]);
					_body.CreateFixture( _fixDef );
				}
			}
		}
	}

	// Left
	for( var _x = 0; _x < _grid_row; _x++) {
		for( var _y = 0; _y < _grid_col; _y++ ) {
			if( _grid[_x]&&_grid[_x][_y] ) {
				//Check Left
				if (_grid[_x - 1] && _grid[_x - 1][_y]) {
					//if there is a grid don't create an edge
					continue;
				} else {
					_v[0] = new b2Vec2(_x * _gs.x , _y * _gs.y);
					_v[0].Multiply(1.0 / box2d_scale);
					_v[1] = new b2Vec2(_x * _gs.x , _y * _gs.y + _gs.y);
					_v[1].Multiply(1.0 / box2d_scale);
					//alert(_x + " out");
					while(_grid[_x - 1] && _grid[_x - 1][_y] && (_grid[_x - 1][_y+1] === undefined)) {
						//alert(_x + " in");
						_v[1].Set(_x * _gs.x , _y * _gs.y + _gs.y);
						_v[1].Multiply(1.0 / box2d_scale);
						_y +=1;
					}
					if(_y > _grid_col) _y = _grid_col;

					//alert(_v[0].x + " , " + _v[0].y + " => " + _v[1].x + " , " + _v[1].y);
					_fixDef.shape = new b2PolygonShape;
					_fixDef.shape.SetAsEdge(_v[0] , _v[1]);
					_body.CreateFixture( _fixDef );
				}
			}
		}
	}

	return _body;

}


function box2d_body_from_json(_fixDef , _body , _sprite_index , _json) {
	for(var i = 0; i < _json.assets.length; i++){
		//if(_json.assets[i].polygons.length > 0){ //there are polygons
		for(var j = 0; j < _json.assets[i].polygons.length; j++){
			var _vertices = new Array();
			var v_l = _json.assets[i].polygons[j].vertices.length;
			for(var v = 0; v < v_l; v++){
				var _x = _sprite_index.width*(_json.assets[i].polygons[j].vertices[v_l - v - 1].x / 100.0);
				var _y = _sprite_index.height;
				_y -= _sprite_index.height*(_json.assets[i].polygons[j].vertices[v_l - v - 1].y / 100.0);
				//alert(_json.assets[i].polygons.length);
				//alert(_x + "   " + _y);
				_vertices[v] = new b2Vec2(_x / box2d_scale , _y / box2d_scale);
			}
			_fixDef.shape = new b2PolygonShape();
			_fixDef.shape.SetAsArray(_vertices , _vertices.length);
			_body.CreateFixture( _fixDef );
		}
	}
}





/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __sprite_2() {
__sprite_init__(this, sprite_2, 64, 64, 32, 32, 'Circle', 32, 0, 64, 0, 64, ['img/sprite_2_0.png']);
}; var sprite_2 = new __sprite_2();

function __sprite_3() {
__sprite_init__(this, sprite_3, 64, 64, 32, 32, 'Circle', 32, 0, 64, 0, 64, ['img/sprite_3_0.png']);
}; var sprite_3 = new __sprite_3();

function __sprite_4() {
__sprite_init__(this, sprite_4, 41, 41, 20, 20, 'Circle', 20, 0, 41, 0, 41, ['img/sprite_4_0.png']);
}; var sprite_4 = new __sprite_4();

function __sprite_27() {
__sprite_init__(this, sprite_27, 16, 16, 8, 8, 'Circle', 8, 0, 16, 0, 16, ['img/sprite_27_0.png']);
}; var sprite_27 = new __sprite_27();

function __sprite_38() {
__sprite_init__(this, sprite_38, 7, 150, 3, 75, 'Box', 3, 0, 7, 0, 150, ['img/sprite_38_0.png']);
}; var sprite_38 = new __sprite_38();

function __sprite_48() {
__sprite_init__(this, sprite_48, 229, 33, 114, 16, 'Box', 114, 0, 229, 0, 33, ['img/sprite_48_0.png']);
}; var sprite_48 = new __sprite_48();

function __sprite_56() {
__sprite_init__(this, sprite_56, 103, 29, 51, 14, 'Box', 51, 0, 103, 0, 29, ['img/sprite_56_0.png']);
}; var sprite_56 = new __sprite_56();

function __sprite_60() {
__sprite_init__(this, sprite_60, 86, 31, 43, 15, 'Box', 43, 0, 86, 0, 31, ['img/sprite_60_0.png']);
}; var sprite_60 = new __sprite_60();

function __sprite_61() {
__sprite_init__(this, sprite_61, 126, 32, 63, 16, 'Box', 63, 0, 126, 0, 32, ['img/sprite_61_0.png']);
}; var sprite_61 = new __sprite_61();

function __sprite_62() {
__sprite_init__(this, sprite_62, 86, 32, 43, 16, 'Box', 43, 0, 86, 0, 32, ['img/sprite_62_0.png']);
}; var sprite_62 = new __sprite_62();

function __sprite_67() {
__sprite_init__(this, sprite_67, 299, 75, 149, 37, 'Box', 149, 0, 299, 0, 75, ['img/sprite_67_0.png']);
}; var sprite_67 = new __sprite_67();

function __sprite_68() {
__sprite_init__(this, sprite_68, 299, 75, 149, 37, 'Box', 149, 0, 299, 0, 75, ['img/sprite_68_0.png']);
}; var sprite_68 = new __sprite_68();

function __sprite_splash() {
__sprite_init__(this, sprite_splash, 256, 256, 128, 128, 'Box', 128, 0, 256, 0, 256, ['img/sprite_splash_0.png']);
}; var sprite_splash = new __sprite_splash();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/


/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __background_5() {
__background_init__(this, background_5, 'img/bitmap444.png')}; var background_5 = new __background_5();



/***********************************************************************
 * FONTS
 ***********************************************************************/
function __font_25() {
__font_init__(this, font_25, 'Impact', 32, 1, 0)}; var font_25 = new __font_25();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __object_paddle1() {
__instance_init__(this, object_paddle1, null, 1, 0, sprite_2, 1, 0);
this.on_creation = function() {
	var b = this;
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.1;//0.01;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.0;
	fixDef.shape = box2d_get_shape_from_sprite(b.sprite_index);
	var bodyDef = new b2BodyDef();
	//bodyDef.type = b2Body.b2_kinematicBody;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.Set(b.x / box2d_scale , b.y / box2d_scale);
	bodyDef.bullet = true;
	bodyDef.userData = b;
	bodyDef.fixedRotation = true;
	bodyDef.allowSleep = false;
	bodyDef.linearDamping = 5.0;
	b.box2d_body = box2d_world.CreateBody(bodyDef);
	b.box2d_body.CreateFixture(fixDef);
	//b.box2d_body.ResetMassData();
	linearVelocity=new b2Vec2(0,0);

	box2d_world.SetGravity(new b2Vec2(0.0,0.0) );
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
	var b = this;
		if (game_on==true ) {

		if (mouse_check() && mapx( mouse_x ) < 240)
		{
		linearVelocity.x = (mapx(mouse_x)-this.x)*.8;
		linearVelocity.y = (mapy(mouse_y)-this.y)*.8;
		}


		if (mouse_check_released())
		{
		linearVelocity.x=0;
		linearVelocity.y=0;

		}

		if ( mapx(mouse_x) > 240) { linearVelocity.x=0;linearVelocity.y=0; }
		b.box2d_body.SetLinearVelocity(linearVelocity);

		}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_paddle1 = new __object_paddle1();

function __object_puck() {
__instance_init__(this, object_puck, null, 1, 0, sprite_4, 1, 2);
this.on_creation = function() {
var b = this;
var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.2;
fixDef.restitution = 1.0;//0.2
//fixDef.shape = new b2CircleShape(6);
fixDef.shape = box2d_get_shape_from_sprite(b.sprite_index);
var bodyDef = new b2BodyDef();
bodyDef.type = b2Body.b2_dynamicBody;
bodyDef.fixedRotation = true;
bodyDef.position.Set(b.x / box2d_scale , b.y / box2d_scale);
bodyDef.allowSleep = false;//чтобы не засыпал при переключении окон и вкладок
bodyDef.linearDamping = 0.3;
bodyDef.bullet = true;
bodyDef.userData = b;
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);
b.box2d_body.ResetMassData();
pos_x=0;
pos_y=0;
goal=false;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
pos_x=x;
pos_y=y;

if (x < 0 && xprevious < 1) {
ai_score+=1;
b.box2d_body.SetPosition(new b2Vec2(300/ box2d_scale,160/ box2d_scale));
b.box2d_body.SetLinearVelocity(new b2Vec2(0,0));
timer_ai=0;
goal=true;
}

if (abs(b.box2d_body.GetLinearVelocity().x) < 0.1 && abs(b.box2d_body.GetLinearVelocity().y) < 0.1 && x > 460 && x < 480)
{
b.box2d_body.SetLinearVelocity(new b2Vec2(0,5));
}

if (x > 480 && xprevious > 481) {
player_score+=1;
b.box2d_body.SetPosition(new b2Vec2(180/ box2d_scale,160/ box2d_scale));
b.box2d_body.SetLinearVelocity(new b2Vec2(0,0));
goal=true;
}

//lv=b.box2d_body.GetLinearVelocity();
//lv.x*=.98;
//lv.y*=.98;

if (player_score==9 && game_on==true) { instance_create(235, 160, object_win);game_on=false;}
if (ai_score==9 && game_on==true) { instance_create(235, 160, object_lose);game_on=false;}

};


this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_puck = new __object_puck();

function __object_barriers() {
__instance_init__(this, object_barriers, null, 1, 1, null, 1, 4);
this.on_creation = function() {
var b = this;
var fixDef = new b2FixtureDef;
fixDef.density = .0;//0.01;
fixDef.friction = .0;
fixDef.restitution = 0.5;

var bodyDef = new b2BodyDef();
bodyDef.type = b2Body.b2_staticBody;
bodyDef.position.Set(b.x / box2d_scale , b.y / box2d_scale);
bodyDef.userData = b;
fixDef.shape = new b2PolygonShape;
fixDef.shape.SetAsBox(.2, 85/box2d_scale);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);

bodyDef.position.Set( b.x / box2d_scale ,  265 / box2d_scale);
fixDef.shape.SetAsBox(.2, 30/box2d_scale);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);

bodyDef.position.Set(1 / box2d_scale , b.y / box2d_scale);
fixDef.shape.SetAsBox(480/box2d_scale, .2);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);


bodyDef.position.Set( b.x / box2d_scale ,  320/ box2d_scale);
fixDef.shape.SetAsBox(480/box2d_scale, .2);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);


bodyDef.position.Set( 480/ box2d_scale  ,  b.y / box2d_scale );
fixDef.shape.SetAsBox(.2,70/box2d_scale);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);

bodyDef.position.Set( 480 / box2d_scale ,  265 / box2d_scale);
fixDef.shape.SetAsBox(.2,30/box2d_scale);
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);

player_score=0;
ai_score=0;
game_on=true;


};

this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_set_font(font_25);
draw_set_alpha(.4);
draw_set_color(0, 0, 0)
draw_text(15,140,player_score+'of9');
draw_text(405,140,ai_score+'of9');


}
};
}; var object_barriers = new __object_barriers();

function __object_paddle2() {
__instance_init__(this, object_paddle2, null, 1, 0, sprite_3, 1, 5);
this.on_creation = function() {
var b = this;
var fixDef = new b2FixtureDef;
fixDef.density = 1.1;//0.01;
fixDef.friction = 0.3;
fixDef.restitution = 0.0;
fixDef.shape = box2d_get_shape_from_sprite(b.sprite_index);
var bodyDef = new b2BodyDef();
//bodyDef.type = b2Body.b2_kinematicBody;
bodyDef.type = b2Body.b2_dynamicBody;
bodyDef.position.Set(b.x / box2d_scale , b.y / box2d_scale);
bodyDef.bullet = true;
bodyDef.userData = b;
bodyDef.fixedRotation = true;
bodyDef.allowSleep = false;
bodyDef.linearDamping = 5.0;
b.box2d_body = box2d_world.CreateBody(bodyDef);
b.box2d_body.CreateFixture(fixDef);
//b.box2d_body.ResetMassData();
timer_ai=35;
velocity=new b2Vec2(0,0);

};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
function moveto(px,py,dx,dy,acc){
dis=point_distance(px,py, dx, dy)
velocity = new b2Vec2(px-dx,py-dy);
force=dis*acc;
vMagnitude = sqrt(velocity.x*velocity.x + velocity.y*velocity.y);
velocity.x = force * velocity.x / vMagnitude;
velocity.y = force * velocity.y / vMagnitude;
return velocity
}

if (game_on==true ) {

if (pos_x > 240 &&  pos_x < 460 && timer_ai > 35) {
moveto(pos_x-16,pos_y,x,y,diff);
}


if (pos_x > 450 || pos_x > x) {
moveto(460,160,x,y,diff);
}

if (pos_x < 240 || pos_x > 480 ) {
//moveto(pos_x,60,x,y,0.1);
moveto(400,160,x,y,diff-0.2);
}

if (x==390 && y==160){ velocity = new b2Vec2(0,0) }
b.box2d_body.SetLinearVelocity(velocity);

timer_ai+=1;

}

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_paddle2 = new __object_paddle2();

function __object_corner() {
__instance_init__(this, object_corner, null, 0, 0, sprite_27, 1, 7);
this.on_creation = function() {
var b = this;
var fixDef = new b2FixtureDef;
fixDef.density = 0.0;
fixDef.friction = 0.0;
fixDef.restitution = 0.5;
fixDef.shape = box2d_get_shape_from_sprite(b.sprite_index);
var bodyDef = new b2BodyDef();

bodyDef.type = b2Body.b2_staticBody;
bodyDef.fixedRotation = true;
bodyDef.position.Set(b.x / box2d_scale , b.y / box2d_scale);
bodyDef.userData = b;
b.box2d_body = box2d_world.CreateBody(bodyDef);
//bbb=b.box2d_body.body;

//b.box2d_body.SetAngle(random(45));

b.box2d_body.CreateFixture(fixDef);
b.box2d_body.ResetMassData();

};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_corner = new __object_corner();

function __object_42() {
__instance_init__(this, object_42, null, 1, -1, sprite_38, 1, 12);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_42 = new __object_42();

function __object_start() {
__instance_init__(this, object_start, null, 1, -2, sprite_48, 1, 15);
this.on_creation = function() {
scale=1;
go=.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
if (place_meeting(mapx(mouse_x), mapy(mouse_y), object_start)!=null && mouse_check_pressed()) {
room_goto(scene_58);
}

if (scale < 1) { go=.03 }
if (scale > 1.2) { go=-.03 }
scale+=go;
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(sprite_48, 0, x, y, scale, scale, direction,1)
}
};
}; var object_start = new __object_start();

function __object_goal() {
__instance_init__(this, object_goal, null, 1, -2, sprite_56, 1, 17);
this.on_creation = function() {
scale1=1;
alpha1=0;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {

if (goal==true && alpha1==0) { alpha1=1; }
if (alpha1 > 0) { alpha1-=.03;scale1+=.03;}
if (alpha1 < .1)  { goal=false; alpha1=0;scale1=1;}

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(sprite_56, 0, x, y, scale1, scale1, direction,alpha1)
}
};
}; var object_goal = new __object_goal();

function __object_easy() {
__instance_init__(this, object_easy, null, 1, -2, sprite_60, 1, 19);
this.on_creation = function() {
var b = this;
b.scale=1;
b.go=.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
if (place_meeting(mapx(mouse_x), mapy(mouse_y), object_easy)!=null && mouse_check_pressed()) {
room_goto(scene_6);
diff=0.3;
}

if (b.scale < 1) { b.go=.03 }
if (b.scale > 1.2) { b.go=-.03 }
b.scale+=b.go;

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_sprite_ext(sprite_60, 0, x, y, b.scale, b.scale, direction,1)
}
};
}; var object_easy = new __object_easy();

function __object_normal() {
__instance_init__(this, object_normal, null, 1, -2, sprite_61, 1, 21);
this.on_creation = function() {
var b = this;
b.scale=1;
b.go=-.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
if (place_meeting(mapx(mouse_x), mapy(mouse_y), object_normal)!=null && mouse_check_pressed()) {
room_goto(scene_6);
diff=0.5
}

if (b.scale < 1) { b.go=.03 }
if (b.scale > 1.2) { b.go=-.03 }
b.scale+=b.go;

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_sprite_ext(sprite_61, 0, x, y, b.scale, b.scale, direction,1)
}
};
}; var object_normal = new __object_normal();

function __object_hard() {
__instance_init__(this, object_hard, null, 1, -2, sprite_62, 1, 23);
this.on_creation = function() {
var b = this;
b.scale=1;
b.go=.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
if (place_meeting(mapx(mouse_x),mapy(mouse_y), object_hard)!=null && mouse_check_pressed()) {
room_goto(scene_6);
diff=0.7;
}

if (b.scale < 1) { b.go=.03 }
if (b.scale > 1.2) { b.go=-.03 }
b.scale+=b.go;

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_sprite_ext(sprite_62, 0, x, y, b.scale, b.scale, direction,1)
}
};
}; var object_hard = new __object_hard();

function __object_win() {
__instance_init__(this, object_win, null, 1, -2, sprite_67, 1, 25);
this.on_creation = function() {
var b = this;
b.scale=1;
b.go=.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
if (place_meeting(mapx(mouse_x), mapy(mouse_y), object_win)!=null && mouse_check_pressed()) {
room_goto(scene_50);
}

if (b.scale < 1) { b.go=.03 }
if (b.scale > 1.2) { b.go=-.03 }
b.scale+=b.go;
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_sprite_ext(sprite_67, 0, x, y, b.scale, b.scale, direction,1)
}
};
}; var object_win = new __object_win();

function __object_lose() {
__instance_init__(this, object_lose, null, 1, -2, sprite_68, 1, 26);
this.on_creation = function() {
var b = this;
b.scale=1;
b.go=.03;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
var b = this;
if (place_meeting(mapx(mouse_x), mapy(mouse_y), object_lose)!=null && mouse_check_pressed()) {
room_goto(scene_50);
}

if (b.scale < 1) { b.go=.03 }
if (b.scale > 1.2) { b.go=-.03 }
b.scale+=b.go;

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
var b = this;
draw_sprite_ext(sprite_68, 0, x, y, b.scale, b.scale, direction,1)
}
};
}; var object_lose = new __object_lose();

function __object_logo() {
__instance_init__(this, object_logo, null, 1, 0, sprite_splash, 1, 27);
this.on_creation = function() {
timer=0;
alpha2=0;
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
timer+=.1;

if (timer < 5) { alpha2+=.05 }
if (timer > 5 && alpha2 > 0.05) {
alpha2-=.05
}
if (alpha2 < 0.05 )
{
alpha2=0;
room_goto(scene_50);
}

};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
draw_sprite_ext(sprite_splash, 0, x, y, 1, 1, direction, alpha2);

}
};
}; var object_logo = new __object_logo();

function __object_scale() {
__instance_init__(this, object_scale, null, 1, 0, null, 1, 30);
this.on_creation = function() {
init_auto_scale();
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_scale = new __object_scale();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __scene_75() {
this.tiles = [
];
this.objects = [
[{o:object_logo, x:240, y:160}],
[{o:object_scale, x:20, y:20}]];
this.start = function() {
__room_start__(this, scene_75, 480, 320, 30, 21, 21, 21, null, 0, 0, 0, 480, 320, null, 50, 50);
};
}
var scene_75 = new __scene_75();
tu_scenes.push(scene_75);
function __scene_50() {
this.tiles = [
];
this.objects = [
[{o:object_start, x:242, y:159}],
[{o:object_scale, x:20, y:20}]];
this.start = function() {
__room_start__(this, scene_50, 480, 320, 30, 0, 0, 0, background_5.image, 0, 0, 0, 480, 320, null, 50, 50);
};
}
var scene_50 = new __scene_50();
tu_scenes.push(scene_50);
function __scene_58() {
this.tiles = [
];
this.objects = [
[{o:object_easy, x:240, y:100}],
[{o:object_normal, x:240, y:160}],
[{o:object_hard, x:240, y:220}],
[{o:object_scale, x:20, y:20}]];
this.start = function() {
__room_start__(this, scene_58, 480, 320, 30, 0, 0, 0, background_5.image, 0, 0, 0, 480, 320, null, 50, 50);
};
}
var scene_58 = new __scene_58();
tu_scenes.push(scene_58);
function __scene_6() {
this.tiles = [
];
this.objects = [
[{o:object_paddle1, x:80, y:160}],
[{o:object_puck, x:180, y:160}],
[{o:object_paddle2, x:360, y:160}],
[{o:object_corner, x:13, y:13}],
[{o:object_corner, x:468, y:14}],
[{o:object_corner, x:468, y:308}],
[{o:object_corner, x:13, y:308}],
[{o:object_42, x:476, y:157}],
[{o:object_42, x:3, y:158, a:180}],
[{o:object_goal, x:240, y:160}],
[{o:object_barriers, x:0, y:0}],
[{o:object_scale, x:40, y:40}]];
this.start = function() {
__room_start__(this, scene_6, 480, 320, 30, 0, 0, 0, background_5.image, 0, 0, 0, 480, 320, null, 50, 50);
};
}
var scene_6 = new __scene_6();
tu_scenes.push(scene_6);
tu_room_to_go = scene_75;


tu_gameloop = tu_loop;
tu_loop();


            }
        }
    });
