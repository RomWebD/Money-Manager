import { Pipe, PipeTransform } from "@angular/core";

@Pipe(
	{
		name:'mmFilter'
	}
)
export class  FilterPipe implements PipeTransform{
	transform(items:any, value:string, field:string): any {

		if(items.length === 0 || !value){
			return items
		}

		return items.filter((i)=>
			{
				const temp = Object.assign({}, i)
				if(!isNaN(temp[field]))
				{
					temp[field] += ''
				}

				if(field === 'type')
					{
						temp[field] = temp[field] === 'income' ? 'дохід' : 'витрати'
					}

				if(field === 'category'){
					temp[field] = temp['catName']
				}

				return temp[field].toLowerCase().indexOf(value.toLowerCase()) !== -1
			}
		)
	}
}