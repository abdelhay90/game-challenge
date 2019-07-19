export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMPING_ = 'skier_jump_';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RHINO_DEFAULT = 'rhinoDefault';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_LIFT_EAT_ = 'rhinoLEat_';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouseOpen';
export const RHINO_LEFT = 'rhinoLeft';
export const RHINO_LEFT_2 = 'rhinoLeft2';

export const SKIER_STARTING_SPEED = 10;
export const RHINO_STARTING_SPEED = 13;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_TIME_DIFF_BETWEEN_JUMPS = 1000;
export const SKIER_TIME_INTERVAL_FOR_JUMPS_ANIMATION = 100;
export const RHINO_TIME_INTERVAL_FOR_KILL_ANIMATION = 200;
export const RHINO_APPEARANCE_TIME = 400;
export const RAMP_SCORE_VALUE = 1;

/**
 * assets constants sprite paths
 */
export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [SKIER_JUMPING_ + 1]: `img/skier_jump_1.png`,
    [SKIER_JUMPING_ + 2]: `img/skier_jump_2.png`,
    [SKIER_JUMPING_ + 3]: `img/skier_jump_3.png`,
    [SKIER_JUMPING_ + 4]: `img/skier_jump_4.png`,
    [SKIER_JUMPING_ + 5]: `img/skier_jump_5.png`,
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_LIFT]: 'img/rhino_lift.png',
    [RHINO_LIFT_EAT_ + 1]: 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_ + 2]: 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_ + 3]: 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_ + 4]: 'img/rhino_lift_eat_4.png',
    [RHINO_LIFT_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
    [RHINO_LEFT]: 'img/rhino_run_left.png',
    [RHINO_LEFT_2]: 'img/rhino_run_left_2.png',
};

/**
 * supported skier directions
 */
export const SKIER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5,
    JUMPING_1: 6,
    JUMPING_2: 7,
    JUMPING_3: 8,
    JUMPING_4: 9,
    JUMPING_5: 10
};

/**
 * supported rhino directions
 */
export const RHINO_DIRECTIONS = {
    DEFAULT: 0,
    LEFT: 1,
    LEFT_2: 2,
    LIFT: 3,
    LIFT_MOUTH_OPEN: 4,
    LIFT_EAT_1: 5,
    LIFT_EAT_2: 6,
    LIFT_EAT_3: 7,
    LIFT_EAT_4: 8,
};

/**
 * supported direction assets
 */
export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMPING_1]: SKIER_JUMPING_ + 1,
    [SKIER_DIRECTIONS.JUMPING_2]: SKIER_JUMPING_ + 2,
    [SKIER_DIRECTIONS.JUMPING_3]: SKIER_JUMPING_ + 3,
    [SKIER_DIRECTIONS.JUMPING_4]: SKIER_JUMPING_ + 4,
    [SKIER_DIRECTIONS.JUMPING_5]: SKIER_JUMPING_ + 5
};

export const RHINO_DIRECTION_ASSET = {
    [RHINO_DIRECTIONS.DEFAULT]: RHINO_DEFAULT,
    [RHINO_DIRECTIONS.LEFT]: RHINO_LEFT,
    [RHINO_DIRECTIONS.LEFT_2]: RHINO_LEFT_2,
    [RHINO_DIRECTIONS.LIFT]: RHINO_LIFT,
    [RHINO_DIRECTIONS.LIFT_EAT_1]: RHINO_LIFT_EAT_ + 1,
    [RHINO_DIRECTIONS.LIFT_EAT_2]: RHINO_LIFT_EAT_ + 2,
    [RHINO_DIRECTIONS.LIFT_EAT_3]: RHINO_LIFT_EAT_ + 3,
    [RHINO_DIRECTIONS.LIFT_EAT_4]: RHINO_LIFT_EAT_ + 4,
    [RHINO_DIRECTIONS.LIFT_MOUTH_OPEN]: RHINO_LIFT_MOUTH_OPEN
};

/**
 * keys used to update game state and skier
 */
export const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    P: 80,
    R: 82,
    D: 68,
    B: 66,
    SPACE: 32
};
