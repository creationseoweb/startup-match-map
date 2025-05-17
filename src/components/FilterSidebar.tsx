
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { industryOptions, roleOptions, skillOptions, stageOptions } from '@/data/mockData';

interface FilterSidebarProps {
  show: boolean;
  onClose: () => void;
}

const FilterSidebar = ({ show, onClose }: FilterSidebarProps) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-medium">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-2">
            <Label>Distance</Label>
            <div className="pt-2">
              <Slider defaultValue={[250]} max={1000} step={50} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 km</span>
              <span>250 km</span>
              <span>1000 km</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Role</Label>
            <div className="space-y-1 pt-1">
              {roleOptions.map((role) => (
                <div key={role.value} className="flex items-center space-x-2">
                  <Checkbox id={`role-${role.value}`} />
                  <Label htmlFor={`role-${role.value}`} className="text-sm font-normal">
                    {role.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Industry</Label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {industryOptions.map((industry) => (
                <Badge 
                  key={industry.value}
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted transition-colors"
                >
                  {industry.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Skills Looking For</Label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skillOptions.map((skill) => (
                <Badge 
                  key={skill.value}
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted transition-colors"
                >
                  {skill.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Startup Stage</Label>
            <div className="space-y-1 pt-1">
              {stageOptions.map((stage) => (
                <div key={stage.value} className="flex items-center space-x-2">
                  <Checkbox id={`stage-${stage.value}`} />
                  <Label htmlFor={`stage-${stage.value}`} className="text-sm font-normal">
                    {stage.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border p-4 space-y-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full">Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
