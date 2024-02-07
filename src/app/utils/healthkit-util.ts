import {
    ActivityData,
    CapacitorHealthkit,
    OtherData,
    QueryOutput,
    SampleNames,
    SleepData,
} from '@perfood/capacitor-healthkit';


//const READ_PERMISSIONS = ['calories', 'stairs', 'activity', 'steps', 'distance', 'duration', 'weight'];
const READ_PERMISSIONS = ['activity'];

export const requestAuthorization = async (): Promise<void> => {
    try {
        return await CapacitorHealthkit.requestAuthorization({
            all: [''],
            read: READ_PERMISSIONS,
            write: [''],
        });

    } catch (error) {
        console.error('[HealthKit-Util] Error getting Authorization:', error);
    }
}

export const getActivityData = async (startDate: Date, endDate: Date = new Date()): Promise<QueryOutput<SleepData>> => {
    try {
        const queryOptions = {
            sampleName: SampleNames.SLEEP_ANALYSIS,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            limit: 0,
        };
        
        return await CapacitorHealthkit.queryHKitSampleType<SleepData>(queryOptions);
    } catch (error) {
        console.error('[HealthKit util] Error al obtener la actividad de dormir');       
        console.error(error);
        throw error;  // Opcional: Puedes volver a lanzar el error si quieres propagarlo más arriba.
    }
};

export const isAvailable = async (): Promise<void> => {
    try {
        return await CapacitorHealthkit.isAvailable();
    } catch (error) {
        console.error('[HealthKit-Util] No availablet:', error);
    }
}

export const isEditionSleepAnalysisAuth = async (): Promise<void> => {
    try {
        return await CapacitorHealthkit.isEditionAuthorized({sampleName: 'activity'});
    } catch (error) {
        console.error('[HealthKit-Util] No availablet:', error);
    }
}



