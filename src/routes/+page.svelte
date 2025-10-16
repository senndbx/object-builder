<script lang="ts">
	import { Download, Plus, Settings, Code } from 'lucide-svelte';
	
	let jsonObject = $state({});
	let formFields = $state([
		{ id: 1, key: '', value: '', type: 'string' }
	]);
	
	function addField() {
		formFields.push({
			id: Date.now(),
			key: '',
			value: '',
			type: 'string'
		});
	}
	
	function removeField(id: number) {
		formFields = formFields.filter(field => field.id !== id);
	}
	
	function updateJsonObject() {
		const newObject = {};
		formFields.forEach(field => {
			if (field.key.trim()) {
				let value = field.value;
				if (field.type === 'number') {
					value = Number(value) || 0;
				} else if (field.type === 'boolean') {
					value = value === 'true';
				} else if (field.type === 'array') {
					try {
						value = JSON.parse(value || '[]');
					} catch {
						value = [];
					}
				}
				newObject[field.key] = value;
			}
		});
		jsonObject = newObject;
	}
	
	function downloadJson() {
		const dataStr = JSON.stringify(jsonObject, null, 2);
		const dataBlob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(dataBlob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'object.json';
		link.click();
		URL.revokeObjectURL(url);
	}
	
	$effect(() => {
		updateJsonObject();
	});
</script>

<div class="h-screen flex flex-col bg-gray-900">
	<!-- Header -->
	<header class="bg-gray-800 border-b border-gray-700 px-6 py-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<Code class="w-8 h-8 text-blue-500" />
				<h1 class="text-2xl font-bold text-white">JSON Builder</h1>
			</div>
			<div class="flex items-center space-x-2">
				<Settings class="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
			</div>
		</div>
	</header>

	<!-- Main Content Area -->
	<div class="flex-1 flex overflow-hidden">
		<!-- Left Panel - Form Builder -->
		<div class="w-1/2 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto custom-scrollbar">
			<div class="space-y-4">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-xl font-semibold text-white">Object Properties</h2>
					<button 
						onclick={addField}
						class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
					>
						<Plus class="w-4 h-4" />
						<span>Add Field</span>
					</button>
				</div>
				
				{#each formFields as field, index (field.id)}
					<div class="bg-gray-700 rounded-lg p-4 space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-300">Field {index + 1}</span>
							{#if formFields.length > 1}
								<button 
									onclick={() => removeField(field.id)}
									aria-label={"Remove field " + (index + 1)}
									title={"Remove field " + (index + 1)}
									class="text-red-400 hover:text-red-300 transition-colors"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
									</svg>
								</button>
							{/if}
						</div>
						
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label for={"key-" + field.id} class="block text-sm font-medium text-gray-300 mb-1">Key</label>
								<input 
									id={"key-" + field.id}
									bind:value={field.key}
									type="text" 
									placeholder="property name"
									class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label for={"type-" + field.id} class="block text-sm font-medium text-gray-300 mb-1">Type</label>
								<select 
									id={"type-" + field.id}
									bind:value={field.type}
									class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="string">String</option>
									<option value="number">Number</option>
									<option value="boolean">Boolean</option>
									<option value="array">Array</option>
								</select>
							</div>
						</div>
						
						<div>
							<label for={"value-" + field.id} class="block text-sm font-medium text-gray-300 mb-1">Value</label>
							{#if field.type === 'boolean'}
								<select 
									id={"value-" + field.id}
									bind:value={field.value}
									class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="true">true</option>
									<option value="false">false</option>
								</select>
							{:else if field.type === 'array'}
								<textarea 
									id={"value-" + field.id}
									bind:value={field.value}
									placeholder='["item1", "item2"] or [1, 2, 3]'
									rows="3"
									class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
								></textarea>
							{:else}
								<input 
									id={"value-" + field.id}
									bind:value={field.value}
									type={field.type === 'number' ? 'number' : 'text'}
									placeholder={field.type === 'number' ? '123' : 'value'}
									class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Panel - JSON Preview -->
		<div class="w-1/2 bg-gray-900 p-6 overflow-y-auto custom-scrollbar">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-white mb-6">JSON Preview</h2>
				
				<div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
					<pre class="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto custom-scrollbar">
						<code>{JSON.stringify(jsonObject, null, 2)}</code>
					</pre>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Action Bar -->
	<div class="bg-gray-800 border-t border-gray-700 px-6 py-4">
		<div class="flex justify-center">
			<button 
				onclick={downloadJson}
				class="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
			>
				<Download class="w-5 h-5" />
				<span>Download JSON</span>
			</button>
		</div>
	</div>
</div>
