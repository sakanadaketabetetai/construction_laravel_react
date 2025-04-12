export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Construction {
    id: number;
    title: string
    fiscalYear: number;
    description: string;
    startDate: string;
    estimatedCompletionDate: string;
    endDate?: string;
    status: 'not_yet_started' | 'ongoing' | 'completed' | 'delayed';
    user_id: number;
    crated_at?: string;
    updated_at?: string;
}

export interface Equipment {
    id: number;
    name: string;
    model: string;
    serialNumber: string;
    manufacturer: string;
    status: 'available' | 'emergency_reserve' | 'maintenance';
    equipment_category_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface EquipmentCategory {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export interface InspectionTemplate {
    id: number;
    name: string;
    description?: string;
    equipment_category_id: number;
    checkItems: CheckItem[];
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CheckItem {
    id: number;
    description: string;
    type: 'visual' | 'measurement' | 'functional';
    required: boolean;
    min_value?: number;
    max_value?: number;
    unit?: string;
  }
  
  export interface InspectionRecord {
    id: number;
    equipment_id: number;
    template_id: number;
    inspector_id: number;
    inspection_date: string;
    status: 'passed' | 'failed' | 'needs_repair';
    notes: string;
    next_inspection_date: string;
    checkResults: CheckResult[];
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CheckResult {
    check_item_id: number;
    result: 'ok' | 'ng' | 'na';
    measurement_value?: string;
    notes?: string;
  }

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
