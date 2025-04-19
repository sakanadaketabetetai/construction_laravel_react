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
    equipment? :Equipment[];
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
    equipment?: Equipment[];
    created_at?: string;
    updated_at?: string;
}

export interface InspectionTemplate {
  id: number;
  name: string;
  description?: string;
  equipment_category_id: number;
  inspection_template_items: {
    id: number;
    field_name: string;
    type: 'visual' | 'measurement' | 'functional';
    unit: string;
    min_value: number | null;
    max_value: number | null;
  }[];
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
  
export interface EquipmentRecord {
  id: number;
  equipment_id: number;
  template_id: number;
  recorded_at: string;
  start_time: string;
  end_time: string;
  created_by_id: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  record_items: EquipmentRecordItem[];
}

export interface EquipmentRecordItem {
  id: number;
  record_id: number;
  template_item_id: number;
  time: string;
  value: number;
  created_at?: string;
  updated_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
