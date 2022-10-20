const enums = {
    image : {
        avatar : 'avatar',
        cicBack : 'cic_back',
        cicFront : 'cic_front',
    },
    role: {
        admin: 1,
        superAdmin: 0,
    },
    statusAdmin: {
        working: 0,
        on_leave: 1,
        quit_job: 2,
    },
    gender: {
        male: 0,
        female: 1,
    },
    contracts :{
        processing: 0,
        completed : 1 ,
        broken : 2
    },
    exchange: {
        pay : 0,
        refund: 1,
    }
};
export default enums;